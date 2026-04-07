# 🚀 IMPLEMENTAR OCR CON GOOGLE CLOUD VISION

Guía paso a paso para agregar OCR a tu app Vercel.

---

## 📋 CHECKLIST RÁPIDO

- [ ] PASO 1: Crear API key Google Cloud (10 min)
- [ ] PASO 2: Agregar clave a Vercel (2 min)
- [ ] PASO 3: Actualizar archivos (3 min)
- [ ] PASO 4: Pushear a GitHub (1 min)
- [ ] PASO 5: Probar (2 min)

**Total: ~20 minutos**

---

## PASO 1: Obtener API KEY de Google Cloud (10 min)

### 1.1 Ir a Google Cloud Console

Ve a: https://console.cloud.google.com

### 1.2 Crear proyecto

1. Click en el dropdown "Mi Proyecto"
2. Click "NUEVO PROYECTO"
3. **Nombre**: `asistencia-ptdam`
4. Click "CREAR"
5. Espera 1 minuto

### 1.3 Habilitar Vision API

1. En la barra de búsqueda, busca: `Cloud Vision API`
2. Click en el resultado
3. Click **"HABILITAR"**
4. Espera a que se habilite

### 1.4 Crear clave de API

1. Click "CREAR CREDENCIALES"
2. Selecciona **Clave de API**
3. Se creará una clave
4. **COPIA LA CLAVE** (formato: `AIzaSy...`)
5. Guárdala en un lugar seguro

### 1.5 Restringir la clave (Seguridad - Opcional)

1. Click en la clave
2. En "Restricciones de aplicación":
   - Selecciona **"Aplicaciones HTTP"**
3. En "Restricciones de API":
   - Click "Seleccionar API"
   - Busca y selecciona **"Cloud Vision API"**
4. Click "GUARDAR"

---

## PASO 2: Agregar API Key a Vercel (2 min)

### 2.1 Ir a Vercel Dashboard

Ve a: https://vercel.com/dashboard

### 2.2 Agregar variable de entorno

1. Click en tu proyecto `kl-s-godin`
2. Click en **Settings**
3. Click en **Environment Variables**
4. Click **Add New**
5. Completa:
   ```
   Name: GOOGLE_CLOUD_VISION_KEY
   Value: AIzaSy... (tu clave completa)
   ```
6. Click **Save**

### 2.3 Confirmar

Verá algo como:
```
GOOGLE_CLOUD_VISION_KEY = AIzaSy... (Protected)
```

---

## PASO 3: Actualizar Archivos (3 min)

Tienes 3 archivos actualizado en `/mnt/outputs/vercel_app_fixed/`:

1. **api/index_updated.js** ← Reemplaza `api/index.js`
2. **public/index_updated.html** ← Reemplaza `public/index.html`
3. **package_updated.json** ← Reemplaza `package.json`

### Opción A: Desde GitHub Web (Más fácil)

En tu repo GitHub:

1. Ve a `api/index.js`
2. Click en el lápiz (Edit)
3. Reemplaza el contenido con `api/index_updated.js`
4. Click "Commit changes"

Repite para:
- `public/index.html` ← con `index_updated.html`
- `package.json` ← con `package_updated.json`

### Opción B: Desde tu PC

```bash
# En tu carpeta del proyecto
cd KL-s-godin

# Reemplaza los archivos
cp api/index_updated.js api/index.js
cp public/index_updated.html public/index.html
cp package_updated.json package.json

# Sube cambios
git add .
git commit -m "Agregar OCR con Google Cloud Vision"
git push origin main
```

---

## PASO 4: Vercel Auto-Deploy (Automático)

Cuando hagas push:
1. Vercel automáticamente inicia deployment
2. Ve a https://vercel.com/dashboard
3. Tu proyecto → Click en él
4. Verás deployment en progreso
5. Espera 2-3 minutos

Si ve error de `@google-cloud/vision`:
→ Verifica que actualizaste `package.json` correctamente

---

## PASO 5: PROBAR LA APP

Ve a: https://kl-s-godin.vercel.app

### 5.1 Subir un PDF

1. Sección "Subir PDF de Asistencia"
2. Click en "Seleccionar archivo"
3. Elige un PDF de asistencia
4. Espera a que procese (~10-30 segundos)
5. Verás mensaje: "✅ Se extrajeron X registros"

### 5.2 Verificar datos

Los datos extraídos aparecerán en la tabla:
- Nombres
- Departamentos
- Fechas
- Horas (si las detecta)

### 5.3 Descargar Excel

Click en "📊 Descargar Excel"

Se descargará un archivo con todos los registros.

---

## ✅ RESULTADO FINAL

Tu app ahora tiene:

| Feature | Estado |
|---------|--------|
| 📤 Subir PDF | ✅ Funcionando |
| 🤖 OCR automático | ✅ Google Vision |
| 📊 Tabla de datos | ✅ Auto-llena |
| 💾 Exportar Excel | ✅ Con datos extraídos |
| ➕ Agregar manual | ✅ Funciona |
| 🌐 Vercel online | ✅ Acceso desde cualquier lugar |

---

## 🆘 TROUBLESHOOTING

### Error: "GOOGLE_CLOUD_VISION_KEY not found"

**Solución:**
1. Verifica que agregaste la variable en Vercel
2. Redeploy el proyecto

```bash
# En Vercel Dashboard:
1. Click en tu proyecto
2. Deployments → Click último deployment rojo
3. Click "Redeploy"
```

### Error: "Quota exceeded"

Google Cloud permite 1000 solicitudes/mes gratis.

Si excedes:
- Habilita billing en Google Cloud Console
- O espera al siguiente mes

### El PDF no se procesa

**Verificar:**
1. ¿Es un PDF válido?
2. ¿Tiene texto (no es solo imagen)?
3. ¿Está en español o inglés?

**Solución:**
- PDFs escaneados necesitan mejor calidad
- Prueba con otro PDF primero

### La tabla no se llena

1. Abre DevTools (F12)
2. Ve a Console
3. Mira si hay errores
4. Copia el error y comparte

---

## 🎓 ¿QUÉ HACE LA API?

Cuando subes un PDF:

```
1. Tu navegador envía el PDF (base64) a Vercel
   ↓
2. Vercel recibe la solicitud en /api/procesar-pdf
   ↓
3. Backend envía imagen a Google Cloud Vision
   ↓
4. Google Vision extrae TEXTO del PDF
   ↓
5. Backend parsea el texto (busca nombres, fechas, horas)
   ↓
6. Backend crea registros en memoria
   ↓
7. Respuesta con datos extraídos
   ↓
8. Tu navegador llena la tabla automáticamente
```

---

## 💡 NOTAS IMPORTANTES

✅ **Gratis**: Google Cloud ofrece 1000 transacciones/mes gratis  
✅ **Seguro**: API key está protegida en Vercel  
✅ **Rápido**: Procesa PDFs en 10-30 segundos  
✅ **Automático**: Los datos se llenan solos en la tabla

⚠️ **Limitaciones**:
- OCR funciona mejor con PDFs de texto limpio
- No funciona con PDFs escaneados de baja calidad
- Máximo 1000 PDFs/mes en plan gratis

---

## 📞 ¿ALGO NO FUNCIONA?

Comparte conmigo:
1. Captura de error (F12 → Console)
2. URL de tu app Vercel
3. El PDF que intentaste procesar

---

## 🎉 ¡HECHO!

Ya tienes:
- ✅ App web en Vercel
- ✅ Subida de PDFs
- ✅ OCR automático
- ✅ Tabla de datos
- ✅ Excel export

**Ahora crea el ejecutable .exe para USB** (ya tienes instrucciones en INSTRUCCIONES_USB_PLUG_AND_PLAY.md)

