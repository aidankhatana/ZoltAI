// This script ensures Prisma Accelerate/Data Proxy is disabled
console.log('Ensuring Prisma Accelerate/Data Proxy is disabled...');

// Set environment variables to disable Prisma Accelerate
process.env.PRISMA_GENERATE_DATAPROXY = 'false';

console.log('Environment variables set:');
console.log('PRISMA_GENERATE_DATAPROXY =', process.env.PRISMA_GENERATE_DATAPROXY);

// Exit successfully
process.exit(0); 