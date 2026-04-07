# 📋 App Asistencia PTDAM

Aplicación web para procesar listas de asistencia en PDF, extraer datos automáticamente y exportar a Excel.

## 🚀 Características

✅ **Subida de PDFs** - Interfaz drag & drop para cargar listas de asistencia  
✅ **Extracción automática** - OCR con Tesseract para leer datos del PDF  
✅ **Validación manual** - Tabla editable para revisar y corregir datos  
✅ **Exportación a Excel** - Genera archivo .xlsx con resumen automático  
✅ **Validación de datos** - Verificación de formatos (horas, fechas, etc.)  

---

## 📦 Requisitos previos

- Python 3.8+
- Tesseract OCR instalado en tu sistema
- pip (gestor de paquetes Python)

### Instalar Tesseract

**Windows:**
```bash
# Descargar e instalar desde:
https://github.com/UB-Mannheim/tesseract/wiki
# O usar chocolatey:
choco install tesseract
```

**macOS:**
```bash
brew install tesseract
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install tesseract-ocr
```

---

## 🔧 Instalación

1. **Clonar/descargar el proyecto:**
```bash
cd app_asistencia
```

2. **Crear entorno virtual (opcional pero recomendado):**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

---

## 🏃 Ejecutar la aplicación

```bash
python app.py
```

La aplicación estará disponible en: **http://localhost:5000**

---

## 📖 Cómo usar

### Paso 1: Subir PDF
- Click en "Seleccionar archivo" o arrastra tu PDF
- El sistema procesará el PDF automáticamente

### Paso 2: Revisar y editar
- La tabla muestra todos los datos extraídos
- Edita cualquier campo directamente en la tabla
- Usa "Agregar fila" para registros faltantes
- Usa "Eliminar" para quitar filas incorrectas

### Paso 3: Validar
- Click en "Validar datos" para verificar formatos
- Corrije cualquier error mostrado

### Paso 4: Exportar
- Click en "Descargar Excel" para obtener el archivo
- Se abrirá automáticamente en tu navegador

---

## 📊 Estructura del Excel generado

### Hoja "Asistencia"
| Columna | Descripción |
|---------|------------|
| ID | Número consecutivo |
| Nombre | Nombre del empleado |
| Departamento/Área | Departamento (Enfermería, etc.) |
| Fecha | Fecha del registro |
| Hora Entrada | Hora de entrada (HH:MM) |
| Hora Salida | Hora de salida (HH:MM) |
| ¿Festivo? | Sí/No para días festivos |
| ¿Falta? | Sí/No para registrar ausencias |
| Fecha Falta | Fecha de la ausencia (si aplica) |
| Notas | Observaciones adicionales |

### Hoja "Resumen"
- Total de registros
- Total de faltas
- Tasa de asistencia por departamento

---

## 🔍 Estructura del proyecto

```
app_asistencia/
├── app.py                 # Aplicación Flask principal
├── requirements.txt       # Dependencias Python
├── templates/
│   └── index.html        # Interfaz HTML
├── static/
│   ├── style.css         # Estilos CSS
│   └── script.js         # Lógica JavaScript
└── uploads/              # Carpeta temporal de PDFs
```

---

## ⚙️ Configuración avanzada

### Variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```
FLASK_ENV=development
FLASK_DEBUG=True
MAX_CONTENT_LENGTH=52428800
```

### Cambiar puerto
En `app.py`, línea final:
```python
app.run(debug=True, port=5001)  # Cambiar 5000 a tu puerto
```

---

## 🐛 Solución de problemas

### Error: "No module named 'pytesseract'"
```bash
pip install pytesseract
```

### Error: "Tesseract is not installed"
Verifica que Tesseract esté instalado correctamente (ver sección Requisitos)

### Error: "PDF processing failed"
- Asegúrate de que el PDF no está corrupto
- Intenta con otro PDF
- Verifica los logs en la consola

### Tabla vacía después de subir PDF
- El PDF podría no tener texto legible (imagen escaneada de mala calidad)
- Intenta con otro PDF
- Puedes agregar filas manualmente

---

## 📈 Mejoras futuras

- [ ] Soporte para múltiples PDFs simultáneamente
- [ ] Base de datos para histórico
- [ ] Gráficos y reportes
- [ ] Integración con sistemas RH
- [ ] Detección automática de festivos
- [ ] Predicción de datos incompletos con IA

---

## 📄 Licencia

Este proyecto es de código abierto. Úsalo libremente.

---

## 👤 Autor

Desarrollado con ❤️ para gestión de asistencia

---

## 📞 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

