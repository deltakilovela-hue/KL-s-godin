# 🚀 Guía Completa: Desplegar en Vercel

## ¿Qué es Vercel?

Vercel es una plataforma GRATIS para desplegar aplicaciones web. Tu app estará online y accesible desde cualquier lugar del mundo.

---

## 📋 Requisitos

- ✅ Cuenta GitHub (crea una en https://github.com)
- ✅ Cuenta Vercel (crea una en https://vercel.com) - es GRATIS
- ✅ La carpeta `vercel_app` que te proporcioné

---

## 🎯 Pasos para desplegar (10 minutos)

### PASO 1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. **Nombre del repositorio**: `asistencia-ptdam` (o el que prefieras)
3. **Description**: "App para gestión de asistencia PTDAM"
4. Elige: **Public** (para acceso fácil)
5. Click "Create repository"

### PASO 2: Subir código a GitHub

En tu PC:

```bash
# Abre CMD/Terminal en la carpeta vercel_app

cd vercel_app

# Inicializa git
git init
git add .
git commit -m "Versión inicial de app asistencia"

# Conecta con GitHub (reemplaza con tu usuario/repo)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/asistencia-ptdam.git
git push -u origin main
```

**Notas:**
- Reemplaza `TU_USUARIO` con tu nombre de usuario GitHub
- GitHub te pedirá autenticación (usa tu token personal)

### PASO 3: Conectar Vercel a GitHub

1. Ve a https://vercel.com
2. Click "Sign Up" (o login si tienes cuenta)
3. Elige "Continue with GitHub"
4. Autoriza Vercel para acceder a GitHub
5. Click "Import Project"
6. Selecciona el repositorio `asistencia-ptdam`
7. Click "Import"

### PASO 4: Configurar y desplegar

La pantalla mostrará:
- **Framework Preset**: Node.js ✓
- **Root Directory**: ./
- Click "Deploy"

**¡Listo!** En 1-2 minutos verás un enlace como:

```
https://asistencia-ptdam-xxxxx.vercel.app
```

Ese es tu app online.

---

## 🎉 Usar tu app online

1. Abre el enlace en tu navegador
2. Comienza a agregar registros
3. Descarga Excel cuando necesites

**Ventajas:**
- ✅ Acceso desde cualquier PC/Tablet
- ✅ Sin necesidad de instalar nada
- ✅ URL compartible con otros usuarios
- ✅ Automático en HTTPS (seguro)

---

## 🔄 Actualizar la app

Si haces cambios en el código:

```bash
# Desde la carpeta vercel_app
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Vercel se actualizará automáticamente en segundos.

---

## ⚠️ Limitaciones actuales

- **Sin base de datos**: Los datos se pierden cuando cierras el navegador
- **Sin OCR**: Debes ingresar datos manualmente
- **Un usuario a la vez**: Está optimizada para uso local o pequeños grupos

### Soluciones (opcionales):

Para agregar **persistencia (guardar datos permanentemente)**:

Necesitarías:
1. Base de datos (MongoDB gratis: https://www.mongodb.com/cloud/atlas)
2. Modificar `server.js` para conectarse a la BD
3. Re-desplegar en Vercel

¿Quieres que agregue soporte de base de datos?

---

## 🛠️ Personalización

### Cambiar tema (colores)

En `public/index.html`, busca:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Cambia los códigos de color:
- `#667eea` → Azul actual
- `#764ba2` → Púrpura actual

### Agregar más departamentos

En `public/index.html`, busca:
```html
<select id="departamento">
    <option value="ENFERMERÍA">ENFERMERÍA</option>
    <option value="ABOGADO">ABOGADO</option>
    <!-- Agrega aquí -->
    <option value="TU_AREA">TU_AREA</option>
</select>
```

---

## 📱 Acceso desde móvil

Funciona perfectamente en:
- iPhone/iPad
- Android
- Tablet

Solo necesitas compartir el enlace Vercel.

---

## 🔐 Seguridad

- Vercel usa HTTPS automático
- Los datos se guardan en memoria (no en servidores)
- Ideal para pruebas o uso interno
- Para producción con datos sensibles, agrega autenticación

---

## 📚 Próximos pasos

Después de desplegar:

1. **Invita usuarios**:
   - Comparteles el enlace Vercel
   - Funcionará en su navegador

2. **Si necesitas persistencia**:
   - Agrega MongoDB (base de datos gratis)
   - Contacta si necesitas ayuda

3. **Si necesitas OCR**:
   - Usa la versión local (.exe) para procesar PDFs
   - Copia los datos a la app web

---

## ❓ Preguntas frecuentes

**P: ¿Es gratis?**  
R: Sí, Vercel ofrece 100 GB/mes gratis, más que suficiente para esta app.

**P: ¿Pueden usarla múltiples personas?**  
R: Sí, todos en el mismo enlace. Pero sin base de datos, los datos de cada sesión son independientes.

**P: ¿Se pierden los datos?**  
R: Sí, cuando cierras el navegador. Para guardar permanentemente, necesitas base de datos.

**P: ¿Puedo cambiar el diseño?**  
R: Sí, editando el HTML/CSS en `public/index.html`.

**P: ¿Cómo agregar base de datos?**  
R: Necesitas MongoDB (gratis en atlas.mongodb.com) + cambiar `server.js`. Puedo ayudarte.

---

## 🆘 Solución de problemas

### Error: "npm install failed"
- Verifica que `package.json` exista
- Revisa que no haya errores en la sintaxis JSON

### El sitio carga pero los botones no funcionan
- Abre DevTools (F12 → Console)
- Busca mensajes de error
- Contacta para ayuda

### Quiero que la URL sea más corta
- Usa un acortador (bit.ly, tinyurl)
- O configura dominio personalizado en Vercel (pago)

---

## 🚀 ¡Felicidades!

Ya tienes tu app online. Ahora tienes dos opciones:

1. **Usar Vercel** para acceso web
2. **Usar ejecutable (.exe)** para procesar PDFs con OCR
3. **Ambas** para máxima flexibilidad

---

**¿Necesitas ayuda con algo más?**

Puedo:
- Agregar base de datos MongoDB
- Implementar OCR en Vercel (Google Cloud Vision)
- Crear la versión .exe
- Personalizar el diseño
- Agregar más funcionalidades

