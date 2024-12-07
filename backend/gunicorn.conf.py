import os
import sys

# Add the project root directory to the Python path
sys.path.append('/workspace/backend')

# Gunicorn configuration
bind = f"0.0.0.0:{os.getenv('PORT', '8000')}"
workers = 3
timeout = 120 