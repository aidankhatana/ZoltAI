#!/bin/bash

echo "Starting Git repository repair process..."

# Create backup directory
BACKUP_DIR="git_backup_$(date +%Y%m%d_%H%M%S)"
echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Manually backup the problematic file
echo "Backing up problematic files..."
cp -R src/app/about/page.tsx "$BACKUP_DIR/"

# Try fixing the repository
echo "Attempting to fix Git repository..."

# Remove the index file to force Git to rebuild it
echo "Removing Git index file..."
rm -f .git/index

# Run git fsck to check for corruption
echo "Checking Git repository integrity..."
git fsck --full

# Prune all unreachable objects
echo "Pruning unreachable objects..."
git gc --aggressive --prune=now

# Rebuild the index
echo "Rebuilding Git index..."
git reset

echo "Git repository repair process completed. If issues persist, try:"
echo "1. git config --global core.compression 0"
echo "2. git config --global pack.window 0"
echo "3. Or create a new repository with: git init new_repo" 