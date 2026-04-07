# 📋 App Asistencia PTDAM - Vercel Edition

Aplicación web para gestión de asistencia, desplegable en Vercel (acceso online).

## ✨ Características

- ✅ Gestión manual de registros de asistencia
- ✅ Tabla editable con todos los datos
- ✅ Exportación a Excel automática
- ✅ Estadísticas en tiempo real
- ✅ Acceso desde cualquier dispositivo
- ✅ Gratis en Vercel

## 🚀 Despliegue en Vercel (5 minutos)

### Requisitos previos
- Cuenta GitHub (gratis)
- Cuenta Vercel (gratis, conecta con GitHub)

### Pasos

**1. Crear repositorio en GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/asistencia-app.git
git push -u origin main
```

**2. Desplegar en Vercel**
- Ir a: https://vercel.com
- Click "New Project"
- Seleccionar tu repositorio en GitHub
- Click "Deploy"

**3. ¡Listo!**
- Tu app estará disponible en: `https://tu-proyecto.vercel.app`

---

## 💻 Uso Local (desarrollo)

### Instalación
```bash
npm install
npm start
```

Abre: http://localhost:3000

---

## 📊 Cómo usar

1. **Agregar registro**
   - Completa los campos (Nombre, Departamento, Fecha son obligatorios)
   - Click en "Agregar Registro"

2. **Ver tabla**
   - Todos los registros aparecen automáticamente
   - Las estadísticas se actualizan en tiempo real

3. **Descargar Excel**
   - Click en "Descargar Excel"
   - Se descargará un archivo .xlsx listo para base de datos

4. **Eliminar registros**
   - Click en 🗑️ para eliminar cualquier registro

---

## 🔧 Personalización

### Agregar más departamentos
Edita `public/index.html`, busca:
```html
<option value="TU_AREA">TU_AREA</option>
```

### Cambiar colores
Edita `public/index.html`, busca las líneas con:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 📱 Compatibilidad

- ✅ Windows, Mac, Linux (cualquier navegador)
- ✅ Tablet y móvil
- ✅ Offline: Los datos se guardan en la sesión

⚠️ **Nota**: Los datos se pierden cuando se recarga (sin base de datos)  
Para persistencia permanente, agrega una base de datos (ver upgrades)

---

## 🔒 Seguridad

- Sin OCR (los datos se ingresan manualmente)
- Sin procesamiento de archivos
- Datos solo en memoria durante la sesión
- Conexión HTTPS (automático en Vercel)

---

## 📈 Upgrades futuros

- [ ] Agregar base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Importar datos desde PDF/Excel
- [ ] Gráficos y reportes
- [ ] Guardado automático en nube

---

## 📞 Soporte

Para problemas:
1. Verifica que Node.js 18+ está instalado
2. Elimina `node_modules` y ejecuta `npm install` nuevamente
3. Revisa los logs en Vercel dashboard

---

## 📄 Licencia

Código abierto. Úsalo libremente.

---

**¡Desplegada en Vercel en minutos! 🚀**
