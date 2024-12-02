#!/bin/bash

echo "🔍 Starting Debug Process..."

# 1. Check Python Installation
echo "1️⃣ Checking Python Installation:"
which python3
python3 --version
echo "-------------------"

# 2. Check Python Environment
echo "2️⃣ Python Environment Variables:"
echo "PYTHONPATH: $PYTHONPATH"
echo "PYTHONHOME: $PYTHONHOME"
echo "PATH: $PATH"
echo "-------------------"

# 3. Check Directory Structure
echo "3️⃣ Directory Structure:"
ls -la
echo "Backend Directory:"
ls -la backend/
echo "-------------------"

# 4. Check Dependencies
echo "4️⃣ Checking pip:"
which pip3
pip3 --version
echo "-------------------"

# Exit if any command fails
set -e

echo "✅ Debug Complete" 