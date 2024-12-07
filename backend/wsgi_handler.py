import os
import sys
from pathlib import Path

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Import the WSGI application
from core.wsgi import application

# For debugging
print("Python path:", sys.path)
print("Current directory:", os.getcwd())
print("Backend directory:", BACKEND_DIR) 