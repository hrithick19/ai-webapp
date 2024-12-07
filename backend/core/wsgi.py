"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys

print("Current working directory:", os.getcwd())
print("Python path:", sys.path)

# Add the project directory to the Python path
sys.path.append('/workspace/backend')  # Adjust this path as necessary

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')  # Adjust according to your project structure

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
