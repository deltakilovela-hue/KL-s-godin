@echo off
echo ====================================
echo App Asistencia PTDAM - Instalador
echo ====================================
echo.

echo Creando entorno virtual...
python -m venv venv

echo Activando entorno virtual...
call venv\Scripts\activate.bat

echo Instalando dependencias...
pip install -r requirements.txt

echo.
echo ====================================
echo Instalacion completada!
echo.
echo Para ejecutar la aplicacion, usa:
echo   run.bat
echo.
echo O ejecuta manualmente:
echo   python app.py
echo.
echo La app estara disponible en:
echo   http://localhost:5000
echo ====================================
