# 🚀 USB Plug and Play - Sin Instalación

## ¿Qué es Plug and Play?

Ejecutable totalmente autocontenido que funciona desde USB sin necesidad de instalar nada.

---

## 📋 Requisitos para CREAR el ejecutable

### Una sola vez en tu PC:

1. **Python 3.8+** instalado
2. **Tesseract OCR** instalado
3. La carpeta `app_ejecutable` que te proporcioné
4. **5 minutos de tu tiempo**

---

## 🎯 Pasos para crear el ejecutable portable

### PASO 1: Instalar Tesseract (1 vez)

1. Descarga: https://github.com/UB-Mannheim/tesseract/wiki
2. Ejecuta `tesseract-ocr-w64-setup-v5.x.exe`
3. **Importante**: Marca "Add Tesseract to PATH" durante instalación
4. Siguiente → Siguiente → Instalar

### PASO 2: Crear el ejecutable

**Abre terminal CMD** en la carpeta `app_ejecutable`:

```bash
# Crear entorno virtual
python -m venv venv
venv\Scripts\activate.bat

# Instalar dependencias
pip install -r requirements-exe.txt

# Crear ejecutable
build_exe.bat
```

**Espera 2-3 minutos...**

Resultado:
```
✓ dist/
  ├── AsistenciaPTDAM.exe   ← Tu app!
  ├── librerias...
  └── _internal/
```

---

## 🔄 Crear "paquete USB" portable

Una vez tengas el `dist/AsistenciaPTDAM.exe`:

### Opción A: Carpeta completa (más seguro)

```
USB:/
├── LEEME.txt               ← Instrucciones
├── AsistenciaPTDAM.exe     ← La app
└── _internal/              ← Librerías
```

**Pasos:**
1. Conecta USB
2. Copia toda la carpeta `dist/` a USB
3. Renombra `dist` a `AsistenciaPTDAM_v1`

### Opción B: Ejecutable comprimido (más pequeño)

```bash
# En Windows, click derecho en dist/ → Enviar a → Carpeta comprimida
# Resultado: dist.zip (~150 MB)
```

Luego en USB:
1. Descomprime `dist.zip`
2. Ejecuta `AsistenciaPTDAM.exe`

---

## ✅ Usar desde USB (en cualquier PC)

### En tu PC:
```bash
# Opción 1: Doble click en AsistenciaPTDAM.exe
# Opción 2: Línea de comandos
USB:\AsistenciaPTDAM.exe
```

### En otra PC con Windows:
```
1. Conecta USB
2. Abre la carpeta USB
3. Doble click en AsistenciaPTDAM.exe
4. Se abre en http://localhost:5000
5. ¡Listo!
```

**SIN instalar nada. SIN dependencias. TOTALMENTE PORTABLE.**

---

## 🎁 Qué está incluido en el ejecutable

✅ Flask (servidor web)  
✅ Tesseract (OCR)  
✅ openpyxl (Excel)  
✅ pdf2image (PDFs)  
✅ Todas las librerías necesarias  

**Tamaño total**: ~200-250 MB  
**Tiempo inicio**: ~3-5 segundos  

---

## 📊 Flujo de trabajo USB

```
Día 1: Crear ejecutable (30 min, 1 sola vez)
  ├─ Instalar Tesseract
  ├─ Ejecutar build_exe.bat
  └─ Copiar dist/ a USB

Días siguientes: Usar desde USB (< 1 min)
  ├─ Conecta USB a PC
  ├─ Abre AsistenciaPTDAM.exe
  ├─ Sube PDF
  ├─ Descarga Excel
  └─ Listo!
```

---

## 🛠️ Personalizar ejecutable (opcional)

### Cambiar nombre
Edita `build_exe.bat`:
```batch
--name "MiApp"  # En lugar de "AsistenciaPTDAM"
```

### Cambiar icono
```batch
--icon=icon.ico  # Si tienes un icono personalizado
```

### Reducir tamaño
```batch
--onefile  # Pero: más lento en arranque
```

---

## 📱 Distribución

### Compartir con colegas:

**Opción 1: USB física**
- Copia la carpeta `AsistenciaPTDAM_v1` a USB
- Comparte USB
- Todos pueden usarla sin instalar

**Opción 2: Compartir archivo**
- Comprime `dist.zip` (~150 MB)
- Sube a Google Drive / OneDrive
- Colegas descargan y descomprimen
- Ejecutan `AsistenciaPTDAM.exe`

**Opción 3: Actualizar versiones**
- Crea `v2`, `v3`, etc.
- Mantén la última en USB
- Todos siempre usan la versión actual

---

## ⚠️ Troubleshooting

### Error: "Windows protegió tu PC"
- Click "Más información"
- Click "Ejecutar de todas formas"
- Es normal en Windows (archivo .exe descargado)

### Error: "Puerto 5000 ya en uso"
Edita `app.py`, última línea:
```python
app.run(debug=True, port=5001)  # Cambiar a otro puerto
```
Recompila: `build_exe.bat`

### Error: "Tesseract no encontrado"
Edita `app.py`, al principio:
```python
import pytesseract
pytesseract.pytesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```
Recompila: `build_exe.bat`

### El ejecutable es muy lento
- Tesseract OCR puede ser lento (normal, es exacto)
- Espera 3-5 segundos por página
- Esto es esperado

---

## 🔒 Seguridad

✅ **Completamente local**: Todo en tu PC  
✅ **Sin internet**: Funciona offline  
✅ **Sin datos en nube**: Tu información es privada  
✅ **Portable**: Puedes eliminar sin dejar rastros  

---

## 📦 Estructura final USB

```
USB:\AsistenciaPTDAM_v1\
├── AsistenciaPTDAM.exe       ← Ejecuta esto
├── _internal\                ← No tocar
│   ├── Librerías...
│   └── Recursos...
├── data\
│   ├── templates\
│   ├── static\
│   └── uploads\
└── README.txt               ← Instrucciones en USB
```

---

## 🎯 Checklist final

- [ ] Tesseract instalado
- [ ] `build_exe.bat` ejecutado correctamente
- [ ] Carpeta `dist/` creada
- [ ] Copiada a USB
- [ ] Probada en tu PC
- [ ] Probada en otra PC (desde USB)
- [ ] Comparte con colegas
- [ ] ¡Disfruta!

---

## 📞 Soporte

Si tienes problemas:

1. **No aparece carpeta `dist/`** 
   → build_exe.bat no terminó. Intenta nuevamente.

2. **404 error en browser**
   → App no inició. Abre CMD en la carpeta USB y ejecuta manualmente.

3. **Tesseract not found**
   → Reinstala Tesseract y marca "Add to PATH".

4. **Antivirus bloquea**
   → Agrega excepción: `AsistenciaPTDAM.exe`

---

## 🎉 ¡Listo!

Ahora tienes una app completamente portable que:

✅ Funciona en cualquier PC Windows  
✅ Se ejecuta desde USB sin instalar  
✅ Procesa PDFs con OCR  
✅ Exporta Excel  
✅ Es segura y privada  
✅ Se puede compartir fácilmente  

**Inversión de tiempo: 30 minutos**  
**Beneficio: Años de uso productivo**

---

**¡Disfruta tu app portable! 🚀**

