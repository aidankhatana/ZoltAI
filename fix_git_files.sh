#!/bin/bash

# Get list of modified files
modified_files=$(git status --porcelain | grep '^ M' | awk '{print $2}')

echo "Starting to fix modified files..."

for file in $modified_files; do
  echo "Fixing $file..."
  
  # Backup the file
  cp "$file" "${file}.bak"
  
  # Remove extended attributes
  xattr -c "$file"
  
  # Recreate the file from backup
  cat "${file}.bak" > "$file"
  
  # Remove backup
  rm "${file}.bak"
  
  # Add to git
  git add "$file"
  
  echo "✅ Fixed $file"
done

echo "All files fixed and added to git." 