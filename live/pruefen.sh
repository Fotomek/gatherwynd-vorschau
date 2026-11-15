#!/bin/sh
# Bricht ab, solange Platzhalter offen sind.
cd "$(dirname "$0")"
if grep -n '{{[A-Z_]*}}' index.html impressum.html datenschutz.html; then echo "OFFEN: Platzhalter vorhanden"; exit 1; fi
echo "OK: keine Platzhalter"
