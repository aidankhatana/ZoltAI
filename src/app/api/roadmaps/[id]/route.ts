import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// Helper to extract user from token
const getUserFromToken = (request: NextRequest) => {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: {
        steps: {
          include: {
            resources: true,
            quiz: {
              include: {
                questions: true
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Roadmap not found' },
        { status: 404 }
      );
    }

    // Check if the user can access this roadmap
    if (!roadmap.isPublic) {
      const user = getUserFromToken(request);
      
      if (!user || (roadmap.userId && user.id !== roadmap.userId)) {
        return NextResponse.json(
          { error: 'Unauthorized to access this roadmap' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roadmap' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const user = getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find the roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Roadmap not found' },
        { status: 404 }
      );
    }

    // Check if the user owns this roadmap
    if (roadmap.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this roadmap' },
        { status: 403 }
      );
    }

    // Delete the roadmap
    await prisma.roadmap.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Roadmap deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to delete roadmap' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const user = getUserFromToken(request);
    const { isPublic, title, description } = await request.json();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find the roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Roadmap not found' },
        { status: 404 }
      );
    }

    // Check if the user owns this roadmap
    if (roadmap.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this roadmap' },
        { status: 403 }
      );
    }

    // Update the roadmap
    const updatedRoadmap = await prisma.roadmap.update({
      where: { id },
      data: {
        isPublic: isPublic !== undefined ? isPublic : undefined,
        title: title || undefined,
        description: description || undefined
      }
    });

    return NextResponse.json({
      message: 'Roadmap updated successfully',
      roadmap: updatedRoadmap
    });
  } catch (error) {
    console.error('Error updating roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to update roadmap' },
      { status: 500 }
    );
  }
} 