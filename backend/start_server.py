import os
import sys
from pathlib import Path

def main():
    # Set up the Python path
    backend_dir = Path(__file__).resolve().parent
    sys.path.insert(0, str(backend_dir))
    
    # Set Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    
    # Start Gunicorn
    from gunicorn.app.wsgiapp import WSGIApplication
    
    class Application(WSGIApplication):
        def init(self, parser, opts, args):
            args = [f"--bind=0.0.0.0:{os.getenv('PORT', '8000')}", 'core.wsgi:application']
            return super().init(parser, opts, args)
    
    Application().run()

if __name__ == '__main__':
    main() 