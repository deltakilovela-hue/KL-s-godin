#!/bin/bash

echo "===================================="
echo "App Asistencia PTDAM - Instalador"
echo "===================================="
echo ""

echo "Creando entorno virtual..."
python3 -m venv venv

echo "Activando entorno virtual..."
source venv/bin/activate

echo "Instalando dependencias..."
pip install -r requirements.txt

echo ""
echo "===================================="
echo "Instalación completada!"
echo ""
echo "Para ejecutar la aplicación, usa:"
echo "  ./run.sh"
echo ""
echo "O ejecuta manualmente:"
echo "  python app.py"
echo ""
echo "La app estará disponible en:"
echo "  http://localhost:5000"
echo "===================================="
