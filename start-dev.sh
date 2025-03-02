#!/bin/bash

# Clean cache and node modules if needed
echo "Cleaning up NextJS cache..."
rm -rf .next

# Install dependencies using clean install
echo "Installing dependencies..."
npm ci

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Set node options for increased memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Start development server with optimized settings
echo "Starting development server..."
npm run dev 