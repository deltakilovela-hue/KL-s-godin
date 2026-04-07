#!/bin/bash

echo "===================================="
echo "App Asistencia PTDAM"
echo "===================================="
echo ""

source venv/bin/activate

echo "Iniciando servidor..."
echo "Abre tu navegador en: http://localhost:5000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

python app.py
