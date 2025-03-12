import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DIRECT_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
});

// Export query function
export const query = async (text: string, params: any[] = []) => {
  try {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query in ${duration}ms: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// User operations
export const userOperations = {
  count: async () => {
    const result = await query('SELECT COUNT(*) FROM "User"');
    return parseInt(result.rows[0].count);
  },
  
  findByEmail: async (email: string) => {
    const result = await query('SELECT * FROM "User" WHERE email = $1', [email]);
    return result.rows[0] || null;
  },
  
  create: async (data: any) => {
    const result = await query(
      'INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [uuidv4(), data.email, data.password, data.name, new Date(), new Date()]
    );
    return result.rows[0];
  }
};

// Roadmap operations
export const roadmapOperations = {
  create: async (data: any) => {
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
      
      // Insert roadmap
      const roadmapResult = await client.query(
        `INSERT INTO "Roadmap" 
         (id, title, description, topic, difficulty, "estimatedTime", "isPublic", "createdAt", "updatedAt", "userId") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
         RETURNING *`,
        [
          data.id || uuidv4(),
          data.title,
          data.description,
          data.topic,
          data.difficulty,
          data.estimatedTime,
          data.isPublic || false,
          new Date(),
          new Date(),
          data.userId
        ]
      );
      
      const roadmap = roadmapResult.rows[0];
      
      // Insert steps
      const steps = [];
      for (const step of data.steps) {
        const stepId = uuidv4();
        
        // Insert step
        const stepResult = await client.query(
          `INSERT INTO "Step" 
           (id, title, description, content, "order", "estimatedTime", "createdAt", "updatedAt", "roadmapId") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
          [
            stepId,
            step.title,
            step.description,
            step.content,
            step.order,
            step.estimatedTime,
            new Date(),
            new Date(),
            roadmap.id
          ]
        );
        
        const createdStep = stepResult.rows[0];
        const resources = [];
        
        // Insert resources
        for (const resource of step.resources) {
          const resourceResult = await client.query(
            `INSERT INTO "Resource" 
             (id, title, url, type, "createdAt", "updatedAt", "stepId") 
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [
              uuidv4(),
              resource.title || 'Resource',
              resource.url,
              resource.type || 'article',
              new Date(),
              new Date(),
              stepId
            ]
          );
          resources.push(resourceResult.rows[0]);
        }
        
        steps.push({
          ...createdStep,
          resources
        });
      }
      
      await client.query('COMMIT');
      return { ...roadmap, steps };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in createRoadmap:', error);
      throw error;
    } finally {
      client.release();
    }
  },
  
  findUnique: async (id: string) => {
    // Get roadmap
    const roadmapResult = await query('SELECT * FROM "Roadmap" WHERE id = $1', [id]);
    if (!roadmapResult.rows[0]) return null;
    
    const roadmap = roadmapResult.rows[0];
    
    // Get steps
    const stepsResult = await query(
      'SELECT * FROM "Step" WHERE "roadmapId" = $1 ORDER BY "order" ASC',
      [id]
    );
    
    const steps = stepsResult.rows;
    
    // Get resources for each step
    for (const step of steps) {
      const resourcesResult = await query(
        'SELECT * FROM "Resource" WHERE "stepId" = $1',
        [step.id]
      );
      step.resources = resourcesResult.rows;
    }
    
    // Get user if userId exists
    if (roadmap.userId) {
      const userResult = await query(
        'SELECT id, email, name FROM "User" WHERE id = $1',
        [roadmap.userId]
      );
      roadmap.user = userResult.rows[0] || null;
    }
    
    return {
      ...roadmap,
      steps
    };
  },
  
  findMany: async (where: any = {}, orderBy: any = { createdAt: 'desc' }) => {
    let whereClause = '';
    const whereParams: any[] = [];
    let paramCount = 1;
    
    // Build where clause
    if (where.userId) {
      whereClause += `"userId" = $${paramCount}`;
      whereParams.push(where.userId);
      paramCount++;
    }
    
    if (where.isPublic !== undefined) {
      if (whereClause) whereClause += ' AND ';
      whereClause += `"isPublic" = $${paramCount}`;
      whereParams.push(where.isPublic);
      paramCount++;
    }
    
    const whereStatement = whereClause ? `WHERE ${whereClause}` : '';
    
    // Get roadmaps
    const query = `
      SELECT * FROM "Roadmap"
      ${whereStatement}
      ORDER BY "createdAt" DESC
    `;
    
    const roadmapsResult = await pool.query(query, whereParams);
    const roadmaps = roadmapsResult.rows;
    
    // Get related data for each roadmap
    for (const roadmap of roadmaps) {
      // Get steps
      const stepsResult = await pool.query(
        'SELECT * FROM "Step" WHERE "roadmapId" = $1 ORDER BY "order" ASC',
        [roadmap.id]
      );
      roadmap.steps = stepsResult.rows;
      
      // Get user if userId exists
      if (roadmap.userId) {
        const userResult = await pool.query(
          'SELECT id, name, email FROM "User" WHERE id = $1',
          [roadmap.userId]
        );
        roadmap.user = userResult.rows[0] || null;
      }
    }
    
    return roadmaps;
  },
  
  update: async (id: string, data: any) => {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update roadmap
      const updateFields = [];
      const updateValues = [];
      let paramCount = 1;
      
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'steps' && key !== 'id') {
          updateFields.push(`"${key}" = $${paramCount}`);
          updateValues.push(value);
          paramCount++;
        }
      }
      
      // Always update the updatedAt timestamp
      updateFields.push(`"updatedAt" = $${paramCount}`);
      updateValues.push(new Date());
      paramCount++;
      
      // Add the id as the last parameter
      updateValues.push(id);
      
      const updateQuery = `
        UPDATE "Roadmap"
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;
      
      const roadmapResult = await client.query(updateQuery, updateValues);
      const roadmap = roadmapResult.rows[0];
      
      // Get existing steps to compare
      const stepsResult = await client.query(
        'SELECT * FROM "Step" WHERE "roadmapId" = $1',
        [id]
      );
      
      // If steps are provided, update them
      if (data.steps) {
        // TODO: Implement step updates if needed
        // This would require comparing existing steps with new ones
        // and performing inserts, updates, or deletes accordingly
      }
      
      await client.query('COMMIT');
      
      // Get the updated roadmap with steps
      return await roadmapOperations.findUnique(id);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error updating roadmap:', error);
      throw error;
    } finally {
      client.release();
    }
  },
  
  delete: async (id: string) => {
    // Cascading delete should handle related steps and resources
    const result = await query('DELETE FROM "Roadmap" WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

// Quiz operations
export const quizOperations = {
  findUnique: async (id: string, includeQuestions = false) => {
    const result = await query('SELECT * FROM "Quiz" WHERE id = $1', [id]);
    const quiz = result.rows[0];
    
    if (!quiz) return null;
    
    if (includeQuestions) {
      const questionsResult = await query('SELECT * FROM "Question" WHERE "quizId" = $1', [id]);
      quiz.questions = questionsResult.rows;
    }
    
    // Get the related step
    const stepResult = await query('SELECT * FROM "Step" WHERE id = $1', [quiz.stepId]);
    quiz.step = stepResult.rows[0];
    
    return quiz;
  }
};

// UserProgress operations
export const userProgressOperations = {
  findMany: async (where: any) => {
    let whereClause = '';
    const whereParams: any[] = [];
    let paramCount = 1;
    
    // Build where clause
    if (where.userId) {
      whereClause += `"userId" = $${paramCount}`;
      whereParams.push(where.userId);
      paramCount++;
    }
    
    if (where.roadmapId) {
      if (whereClause) whereClause += ' AND ';
      whereClause += `"roadmapId" = $${paramCount}`;
      whereParams.push(where.roadmapId);
      paramCount++;
    }
    
    if (where.stepId) {
      if (whereClause) whereClause += ' AND ';
      whereClause += `"stepId" = $${paramCount}`;
      whereParams.push(where.stepId);
      paramCount++;
    }
    
    const whereStatement = whereClause ? `WHERE ${whereClause}` : '';
    
    const result = await query(
      `SELECT * FROM "UserProgress" ${whereStatement}`,
      whereParams
    );
    
    return result.rows;
  },
  
  findFirst: async (where: any) => {
    const results = await userProgressOperations.findMany(where);
    return results[0] || null;
  },
  
  create: async (data: any) => {
    const result = await query(
      `INSERT INTO "UserProgress" 
       (id, "userId", "roadmapId", "stepId", completed, "quizScore", "completedAt", "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        uuidv4(),
        data.userId,
        data.roadmapId,
        data.stepId,
        data.completed || false,
        data.quizScore,
        data.completedAt,
        new Date(),
        new Date()
      ]
    );
    
    return result.rows[0];
  },
  
  update: async (where: any, data: any) => {
    let whereClause = '';
    const whereParams: any[] = [];
    let paramCount = 1;
    
    // Build where clause
    if (where.id) {
      whereClause = `id = $${paramCount}`;
      whereParams.push(where.id);
      paramCount++;
    } else {
      if (where.userId) {
        whereClause += `"userId" = $${paramCount}`;
        whereParams.push(where.userId);
        paramCount++;
      }
      
      if (where.roadmapId) {
        if (whereClause) whereClause += ' AND ';
        whereClause += `"roadmapId" = $${paramCount}`;
        whereParams.push(where.roadmapId);
        paramCount++;
      }
      
      if (where.stepId) {
        if (whereClause) whereClause += ' AND ';
        whereClause += `"stepId" = $${paramCount}`;
        whereParams.push(where.stepId);
        paramCount++;
      }
    }
    
    // Build update fields
    const updateFields = [];
    const updateValues = [...whereParams]; // Start with the where values
    
    for (const [key, value] of Object.entries(data)) {
      updateFields.push(`"${key}" = $${paramCount}`);
      updateValues.push(value);
      paramCount++;
    }
    
    // Always update the updatedAt timestamp
    updateFields.push(`"updatedAt" = $${paramCount}`);
    updateValues.push(new Date());
    
    const query = `
      UPDATE "UserProgress"
      SET ${updateFields.join(', ')}
      WHERE ${whereClause}
      RETURNING *
    `;
    
    const result = await pool.query(query, updateValues);
    return result.rows[0];
  }
};

export default {
  query,
  user: userOperations,
  roadmap: roadmapOperations,
  quiz: quizOperations,
  userProgress: userProgressOperations,
  createRoadmap: roadmapOperations.create // For backward compatibility
}; 