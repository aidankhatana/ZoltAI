#!/bin/bash

# Create a timestamp for the backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR=~/Desktop/SophosAI_backup_$TIMESTAMP

# Create backup directory
echo "Creating backup at $BACKUP_DIR..."
mkdir -p $BACKUP_DIR

# Copy all project files except node_modules and .git to backup
echo "Backing up project files..."
rsync -av --progress ~/Desktop/SophosAI/ $BACKUP_DIR/ --exclude node_modules --exclude .git --exclude .next

# Navigate to project directory
cd ~/Desktop/SophosAI

# Check if we're in the right directory
if [ ! -d ".git" ]; then
  echo "Error: .git directory not found. Make sure you're in the right project directory."
  exit 1
fi

# Check for any unstaged changes
if [ -n "$(git status --porcelain)" ]; then
  echo "Warning: You have unstaged changes. These will be preserved in the backup."
  echo "After running this script, you can manually add them back from $BACKUP_DIR"
fi

# Fix Git repository corruption
echo "Attempting to fix Git repository corruption..."

# Try git fsck first
echo "Running git fsck to check for issues..."
git fsck --full

# Try to repair index
echo "Repairing Git index..."
rm -f .git/index
git reset

# Attempt a pack repair
echo "Repairing Git packfiles..."
find .git/objects/pack -name "*.idx" | while read i; do
    echo "Verifying pack file for $i"
    base="${i%.idx}"
    git verify-pack -v "$base.pack" || true
done

# Force garbage collection
echo "Running git garbage collection..."
git gc --aggressive --prune=now

# Re-initialize the repository if needed
if [ $? -ne 0 ]; then
    echo "Standard fixes failed. Performing advanced recovery..."
    
    # Create a fresh repository
    echo "Creating fresh repository..."
    TEMP_DIR=~/Desktop/SophosAI_temp
    mkdir -p $TEMP_DIR
    
    # Initialize a new repository in the temp directory
    cd $TEMP_DIR
    git init
    
    # Copy all files except .git
    echo "Copying project files to fresh repository..."
    rsync -av --progress $BACKUP_DIR/ ./ --exclude .git
    
    # Add all files and commit
    git add .
    git commit -m "Repository recovery due to corruption"
    
    # Move the new .git directory back
    echo "Replacing corrupted .git directory..."
    rm -rf ~/Desktop/SophosAI/.git
    cp -r .git ~/Desktop/SophosAI/
    
    # Clean up
    cd ~/Desktop/SophosAI
    rm -rf $TEMP_DIR
fi

# Final check
echo "Running final check..."
git status

echo "Git repository repair complete!"
echo "Your original files have been backed up to: $BACKUP_DIR"
echo "If you had uncommitted changes, you can find them in the backup."
echo ""
echo "Next steps:"
echo "1. Verify your repository works by running: git log"
echo "2. Check that files can be properly indexed: git add ."
echo "3. If everything looks good, make a commit: git commit -m 'Repository fixed'" 