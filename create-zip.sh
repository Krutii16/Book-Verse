#!/bin/bash

# BookVerse - Create ZIP File Script
# Usage: bash create-zip.sh

echo "======================================"
echo "BookVerse ZIP Creation Script"
echo "======================================"

# Create zip file
echo "Creating BookVerse.zip..."
zip -r BookVerse.zip \
  server/ \
  client/ \
  package.json \
  .env.example \
  README.md \
  RUNNING_INSTRUCTIONS.md \
  QUICK_REFERENCE.md \
  BUILD_SUMMARY.md \
  COMPLETION_REPORT.md \
  START_HERE.txt \
  -x "*/node_modules/*" \
     "*/.angular/*" \
     "*/dist/*" \
     "*/.git/*" \
     "*/.env" \
     "*.zip"

echo ""
echo "✓ BookVerse.zip created successfully!"
echo ""
echo "======================================"
echo "Download Instructions:"
echo "======================================"
echo "1. Download: BookVerse.zip"
echo "2. Extract: unzip BookVerse.zip"
echo "3. Install: npm run install-all"
echo "4. Seed DB: npm run seed"
echo "5. Run: npm run dev"
echo ""
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:5000"
echo "======================================"
