@echo off
REM BookVerse - Create ZIP File Script (Windows)
REM Usage: create-zip.bat

echo ======================================
echo BookVerse ZIP Creation Script
echo ======================================
echo.

REM Using PowerShell to create zip (Windows 10+)
echo Creating BookVerse.zip...
powershell -Command "& {
  $source = '.'
  $destination = 'BookVerse.zip'
  
  if(Test-Path $destination) {
    Remove-Item $destination
  }
  
  $compress = @{
    Path = 'server', 'client', 'package.json', '.env.example', 'README.md', 'RUNNING_INSTRUCTIONS.md', 'QUICK_REFERENCE.md', 'BUILD_SUMMARY.md', 'COMPLETION_REPORT.md', 'START_HERE.txt'
    CompressionLevel = 'Fastest'
    DestinationPath = $destination
  }
  
  Compress-Archive @compress -Force
  Write-Host 'ZIP file created successfully!'
}"

echo.
echo ======================================
echo Download Instructions:
echo ======================================
echo 1. Download: BookVerse.zip
echo 2. Extract: Right-click and select Extract All
echo 3. Install: npm run install-all
echo 4. Seed DB: npm run seed
echo 5. Run: npm run dev
echo.
echo Frontend: http://localhost:4200
echo Backend: http://localhost:5000
echo ======================================
echo.
pause
