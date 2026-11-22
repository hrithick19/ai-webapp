#!/usr/bin/env bash
set -euo pipefail

python3 -m pip install -r requirements.txt

# Static collection uses the settings module's SQLite-only build path.
COLLECTING_STATIC=1 DEBUG=True python3 backend/manage.py collectstatic --noinput
