#!/usr/bin/env bash
set -euo pipefail

# Koyeb's Python buildpack installs requirements and collects static files.
# Keep this as a no-op if the service still invokes it as a custom build command.
exit 0
