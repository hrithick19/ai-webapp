#!/bin/bash

# Set the Python path
export PYTHONPATH=/workspace/backend:$PYTHONPATH

# Change to the backend directory
cd backend

# Start Gunicorn
exec gunicorn \
    --config gunicorn.conf.py \
    --chdir /workspace/backend \
    --pythonpath /workspace/backend \
    core.wsgi:application 