#!/bin/bash

echo "🚀 Starting build process..."

# Enable error tracking
set -e

# Debug information
echo "📍 Current directory: $(pwd)"

# Clear any existing Python-related environment variables
unset PYTHONPATH
unset PYTHONHOME
unset PYTHONROOT
unset PYTHONBIN

# Use the Python binary directly from Heroku's Python installation
PYTHON_BIN="/app/.heroku/python/bin/python3"

echo "📍 Using Python: $PYTHON_BIN"
$PYTHON_BIN --version

# Install dependencies directly (no virtualenv)
echo "📦 Installing dependencies..."
$PYTHON_BIN -m pip install --user --upgrade pip
$PYTHON_BIN -m pip install --user -r requirements.txt

# Navigate to backend
echo "📂 Changing to backend directory..."
cd backend

# Database migrations
echo "🔄 Running migrations..."
$PYTHON_BIN manage.py makemigrations
$PYTHON_BIN manage.py migrate

# Create superuser
if [[ -n "${DJANGO_SUPERUSER_USERNAME:-}" ]] && \
   [[ -n "${DJANGO_SUPERUSER_PASSWORD:-}" ]] && \
   [[ -n "${DJANGO_SUPERUSER_EMAIL:-}" ]]; then
    echo "👤 Creating superuser..."
    $PYTHON_BIN manage.py createsuperuser --noinput || echo "Superuser already exists"
fi

echo "✨ Build process completed"