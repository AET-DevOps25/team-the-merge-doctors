#!/bin/bash
set -e

CERTIFICATE_DIR="$HOME/mentorpulse-certificates"
mkdir -p "$CERTIFICATE_DIR"

KEY_FILE="$CERTIFICATE_DIR/jwt-secret.key"

if [ -f "$KEY_FILE" ]; then
  echo "Secret key already exists at $KEY_FILE"
else
  head -c 32 /dev/urandom | base64 > "$KEY_FILE"
  chmod 600 "$KEY_FILE"
  echo "Secret key generated at $KEY_FILE"
fi