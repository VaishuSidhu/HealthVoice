# HealthVoice Backend Startup Script for Windows
Write-Host "Starting HealthVoice Backend..." -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Virtual environment not found. Running setup..." -ForegroundColor Yellow
    & ".\setup.ps1"
    if ($LASTEXITCODE -ne 0) {
        exit 1
    }
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Creating default..." -ForegroundColor Yellow
    @"
MONGODB_URI=mongodb://localhost:27017/healthvoice
FLASK_ENV=development
PORT=5000
"@ | Out-File -FilePath .env -Encoding utf8
}

# Start Flask server
Write-Host "Starting Flask server on http://localhost:5000" -ForegroundColor Green
Write-Host ""
python app.py

