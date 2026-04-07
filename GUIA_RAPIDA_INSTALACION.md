# 🚀 Guía Rápida de Instalación - App Asistencia PTDAM

## Opción 1: Windows (Recomendado - Más fácil)

### Paso 1: Instalar Tesseract OCR
1. Descarga desde: https://github.com/UB-Mannheim/tesseract/wiki
2. Ejecuta el instalador (`.exe`)
3. Instala en la ruta por defecto: `C:\Program Files\Tesseract-OCR`

### Paso 2: Ejecutar la aplicación
1. Abre una terminal/CMD en la carpeta `app_asistencia`
2. Ejecuta:
   ```bash
   install.bat
   ```
   Esto instalará todas las dependencias automáticamente.

3. Cuando termine, ejecuta:
   ```bash
   run.bat
   ```

4. Abre tu navegador en: **http://localhost:5000**

---

## Opción 2: macOS

### Paso 1: Instalar Tesseract
```bash
brew install tesseract
```

### Paso 2: Ejecutar la aplicación
```bash
cd app_asistencia
chmod +x install.sh run.sh
./install.sh
./run.sh
```

Abre: **http://localhost:5000**

---

## Opción 3: Linux (Ubuntu/Debian)

### Paso 1: Instalar Tesseract
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

### Paso 2: Ejecutar la aplicación
```bash
cd app_asistencia
chmod +x install.sh run.sh
./install.sh
./run.sh
```

Abre: **http://localhost:5000**

---

## 🎯 Cómo usar la aplicación

### 1️⃣ **Subir PDF**
   - Arrastra tu PDF sobre el área de carga
   - O haz click en "Seleccionar archivo"

### 2️⃣ **Revisar datos**
   - Aparecerá una tabla con los datos extraídos
   - Puedes editar cualquier celda
   - Click en "Eliminar" para quitar filas incorrectas
   - Click en "Agregar fila" para agregar registros manualmente

### 3️⃣ **Validar**
   - Haz click en "Validar datos"
   - El sistema verificará horas, fechas, etc.

### 4️⃣ **Exportar**
   - Haz click en "Descargar Excel"
   - El archivo se descargará automáticamente

---

## 📊 Qué incluye el Excel

✅ **Hoja "Asistencia"**: Tabla con todos los registros  
✅ **Hoja "Resumen"**: Estadísticas automáticas  
✅ Formatos profesionales y listos para base de datos  

---

## 🔧 Solución de problemas

### ❌ "Tesseract is not installed"
→ Reinstala Tesseract siguiendo el Paso 1

### ❌ "No module named 'Flask'"
→ Asegúrate que el archivo `requirements.txt` existe
→ Ejecuta: `pip install -r requirements.txt`

### ❌ Port 5000 ya está en uso
→ Edita `app.py`, línea final, cambia `port=5000` a `port=5001`

### ❌ El PDF aparece pero la tabla está vacía
→ El OCR podría no leer el PDF correctamente
→ Intenta con otro PDF
→ Puedes agregar los datos manualmente con "Agregar fila"

---

## 📁 Estructura de archivos

```
app_asistencia/
├── app.py                    # Programa principal
├── requirements.txt          # Dependencias
├── install.bat / install.sh  # Instalador
├── run.bat / run.sh          # Ejecutor
├── README.md                 # Documentación completa
├── templates/
│   └── index.html           # Interfaz web
├── static/
│   ├── style.css           # Estilos
│   └── script.js           # Lógica JavaScript
└── uploads/                # Carpeta de PDFs (se crea automáticamente)
```

---

## 💡 Consejos

✅ Primero instala Tesseract antes de ejecutar la aplicación  
✅ Usa el archivo `install.bat` (Windows) o `install.sh` (Mac/Linux)  
✅ Si necesitas cambiar el puerto, edita `app.py`  
✅ Los archivos Excel se generan con formato profesional  
✅ Puedes editar todos los datos en la tabla antes de exportar  

---

## ¿Necesitas ayuda?

1. Revisa el archivo `README.md` en la carpeta `app_asistencia`
2. Verifica que todas las dependencias estén instaladas
3. Comprueba que Tesseract está en el PATH del sistema

---

**¡Ya estás listo! 🎉**

Ahora puedes procesar PDFs de asistencia y obtener Excel listos para base de datos.
