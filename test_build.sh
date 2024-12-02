#!/bin/bash

echo "🧪 Starting test process..."

# Test Python
echo "Testing Python..."
if ! python3 --version; then
    echo "❌ Python test failed"
    exit 1
fi

# Test virtual environment creation
echo "Testing venv creation..."
if ! python3 -m venv test_venv; then
    echo "❌ Virtual environment creation failed"
    exit 1
fi

# Test pip
echo "Testing pip..."
source test_venv/bin/activate
if ! pip install --upgrade pip; then
    echo "❌ Pip upgrade failed"
    exit 1
fi

# Test Django
echo "Testing Django installation..."
if ! pip install Django; then
    echo "❌ Django installation failed"
    exit 1
fi

# Cleanup
deactivate
rm -rf test_venv

echo "✅ All tests passed!" 