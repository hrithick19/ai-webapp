#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Navigate to the backend directory
cd backend

python manage.py collectstatic --no-input
python manage.py migrate 