# 🖥️ Crear Ejecutable (.exe) para Windows - USB Portátil

## ¿Qué es un ejecutable?

Es un archivo `.exe` que puedes ejecutar en cualquier PC Windows sin necesidad de instalar nada. Perfecto para llevar en USB.

---

## 📋 Requisitos

- PC con **Windows 10/11**
- **Python 3.8+** instalado ([descargar](https://www.python.org/downloads/))
- **Tesseract OCR** instalado ([descargar](https://github.com/UB-Mannheim/tesseract/wiki))
- Carpeta `app_ejecutable` que te proporcioné

---

## 🎯 Pasos para crear el .exe

### PASO 1: Instalar Tesseract

1. Descarga desde: https://github.com/UB-Mannheim/tesseract/wiki
2. Descarga: **tesseract-ocr-w64-setup-v5.x.exe**
3. Ejecuta el instalador
4. **Instalación típica** (ruta por defecto está bien)
5. Finaliza la instalación

### PASO 2: Preparar el código

1. Abre una **terminal CMD** (Win+R → `cmd`)
2. Ve a la carpeta `app_ejecutable`:
   ```bash
   cd C:\ruta\a\app_ejecutable
   ```

3. Crea un entorno virtual:
   ```bash
   python -m venv venv
   venv\Scripts\activate.bat
   ```

### PASO 3: Instalar dependencias

```bash
pip install -r requirements-exe.txt
```

Esto instala:
- Flask (servidor web)
- Tesseract (OCR)
- openpyxl (Excel)
- PyInstaller (compilador)

### PASO 4: Crear el ejecutable

Desde la carpeta `app_ejecutable`, ejecuta:

```bash
build_exe.bat
```

**Espera 2-5 minutos...**

Cuando termine, verás:
```
✓ Ejecutable creado en: dist/AsistenciaPTDAM.exe
```

---

## ✅ Tu ejecutable está listo

El archivo `dist/AsistenciaPTDAM.exe` es tu aplicación.

### Copiar a USB

1. Conecta una USB
2. Copia **toda la carpeta `dist`** a la USB
3. En cualquier PC Windows: abre `AsistenciaPTDAM.exe`

**¡Listo!** La app se abrirá en http://localhost:5000

---

## 🚀 Usar el ejecutable

### En tu PC:
```bash
# Doble click en AsistenciaPTDAM.exe
# O desde CMD:
dist/AsistenciaPTDAM.exe
```

### En otro PC (desde USB):
```bash
# Inserta USB
# Abre AsistenciaPTDAM.exe desde la USB
# Listo, funciona offline sin instalar nada
```

---

## 📋 Qué puedes hacer con el .exe

✅ Subir PDFs de asistencia  
✅ OCR automático (extrae nombres, horas, etc.)  
✅ Editar datos en la tabla  
✅ Descargar Excel  
✅ Usar offline sin internet  
✅ Llevar en USB a cualquier lado  

---

## 🎯 Caso de uso perfecto

Imagina esto:

1. **Lunes**: Generas el .exe y lo copias a USB
2. **De martes a viernes**: Llevas USB al trabajo
3. **Cada día**: Abres el .exe, subes el PDF del día, descarga Excel
4. **Viernes**: Tienes una tabla Excel consolidada de toda la semana
5. **Lunes siguiente**: Repite con nuevos PDFs

**Todo sin internet, sin instalar, sin complicaciones.**

---

## 🛠️ Personalizar el ejecutable

### Cambiar nombre/icono

Edita `build_exe.bat`:

```batch
--name "MiAppPersonalizada"  # Cambia el nombre
--icon=icon.ico              # Agrega tu icono
```

### Cambiar configuración Flask

Edita `app.py`, última línea:
```python
app.run(debug=True, port=5000)  # Cambiar puerto si es necesario
```

---

## ⚠️ Antivirus puede bloquear

Algunos antivirus pueden advertir sobre archivos ejecutables generados. Es normal (PyInstaller crea archivos "ejecutables").

**Para ignorar:**
1. Windows Defender → exclusiones
2. O agrega `AsistenciaPTDAM.exe` a excepciones

---

## 📦 Estructura del ejecutable

Cuando compilas, obtienes:

```
dist/
├── AsistenciaPTDAM.exe     ← El programa principal
├── tcl86t.dll             ← Librerías necesarias
├── tk86t.dll              ← Librerías necesarias
└── _internal/             ← Recursos internos
```

**Importante**: Todos estos archivos deben estar en la misma carpeta.

---

## 🚀 Optimizaciones (opcional)

### Reducir tamaño

Si el .exe es muy grande (~200MB+), puedes:

1. Usar `--onefile` (una sola carpeta)
2. Eliminar módulos innecesarios
3. Usar UPX para comprimir

### Hacer más rápido

Edita `build_exe.bat`:
```batch
--noconfirm  # Recompila sin preguntar
--clean      # Limpia builds anteriores
```

---

## ❓ Preguntas frecuentes

**P: ¿Puedo compartir el .exe?**  
R: Sí, es tuyo. Comparte la carpeta `dist` completa.

**P: ¿Necesita internet?**  
R: No, funciona completamente offline.

**P: ¿Puedo ejecutarlo en Mac/Linux?**  
R: No, el .exe es solo Windows. Pero la app Flask original funciona en cualquier OS.

**P: ¿Qué pasa si borro algo de la carpeta dist?**  
R: Es mejor no hacerlo. Mantén todo junto.

**P: ¿Cómo actualizar el .exe?**  
R: Modifica `app.py`, ejecuta `build_exe.bat` nuevamente, recopila `dist` a USB.

---

## 🔧 Solución de problemas

### "Python no está reconocido"
```bash
# Reinstala Python y marca "Add Python to PATH"
```

### "Tesseract no encontrado"
```bash
# Verifica instalación en C:\Program Files\Tesseract-OCR
# Si está en otra ruta, edita app.py:
pytesseract.pytesseract.pytesseract_cmd = r'C:\tu\ruta\tesseract.exe'
```

### "No puedo crear el .exe"
```bash
# Abre CMD como Administrador
# Ejecuta: pip install --upgrade setuptools
# Luego: build_exe.bat
```

### El .exe no abre nada
- Verifica que todos los archivos están en `dist`
- Abre CMD en esa carpeta y ejecuta:
  ```bash
  AsistenciaPTDAM.exe
  ```
- Verifica los errores en la consola

---

## 📱 Llevar en USB

Pasos finales:

1. **Carpeta completa**: Copia `dist/` a USB
2. **Renombra** la carpeta a algo memorable: `App_Asistencia_v1`
3. **Crea acceso directo**:
   - Click derecho en `AsistenciaPTDAM.exe`
   - "Enviar a" → "Escritorio (crear acceso directo)"

4. **Etiqueta la USB**: "App Asistencia PTDAM - Usar offline"

5. **Distribuye** a tus compañeros si lo necesitan

---

## 🎉 ¡Listo!

Ahora tienes:

| Opción | Vercel (Web) | Ejecutable (USB) |
|--------|------------|-----------------|
| **Acceso** | Online desde navegador | Offline en cualquier PC |
| **OCR** | ❌ Manual | ✅ Automático |
| **Internet** | ✅ Requerido | ❌ No necesario |
| **Base de datos** | ❌ Datos se pierden | ❌ Datos se pierden |
| **Portátil** | ✅ Cualquier navegador | ✅ Solo Windows |
| **Facilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

**Usa Vercel para equipos remotos, y el .exe para trabajo local/offline.**

¿Necesitas ayuda con algo?

