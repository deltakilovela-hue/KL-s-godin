# 📋 Aplicación de Análisis de Asistencia - Especificaciones

## 🎯 Objetivo General
Crear una aplicación web que permita:
1. Subir PDFs de listas de asistencia (listas de PTDAM escaneadas)
2. Extraer datos automáticamente usando IA/OCR
3. Revisar y validar información manualmente
4. Exportar datos a Excel para base de datos

---

## 📊 Datos a Extraer del PDF

### Información Principal (Por Empleado)
- ✅ **Nombre** del empleado
- ✅ **Número/ID** (consecutivo)
- ✅ **Departamento/Área** (Enfermería, Abogado, Administración, etc.)
- ✅ **Período** (mes/año del registro)

### Información de Asistencia (Por Día)
- ✅ **Fecha** del registro
- ✅ **Hora de Entrada** (formato HH:MM)
- ✅ **Hora de Salida** (formato HH:MM)
- ✅ **Festivo** (Sí/No) - detectar domingos, días feriados
- ✅ **Falta** (Sí/No) - si no hay registro ese día
- ✅ **Notas/Observaciones** (firmas, comentarios)

---

## 🏗️ Arquitectura de la Aplicación

### **Frontend (Interfaz de Usuario)**
- **Página Principal**: 
  - Botón para subir PDF
  - Arrastrar y soltar (Drag & Drop)
  - Vista previa del PDF
  
- **Validación Manual**:
  - Tabla con datos extraídos
  - Opción de editar datos incompletos
  - Confirmar/descartar registros
  
- **Exportación**:
  - Descargar Excel con datos finales
  - Opciones de formato

### **Backend (Procesamiento)**
1. **Recepción de PDF**
2. **OCR/Extracción de Datos**
   - Usar: Tesseract OCR + Python (pytesseract)
   - O: Azure Computer Vision API
   - O: Google Cloud Vision API
3. **Procesamiento de Datos**
   - Limpieza de texto
   - Validación de formato
   - Detección de festivos
4. **Generación de Excel**
   - Usar openpyxl

---

## 💾 Estructura de Datos - Excel

### Hoja 1: "Asistencia"
| ID | Nombre | Departamento/Área | Fecha | Hora Entrada | Hora Salida | ¿Festivo? | ¿Falta? | Fecha Falta | Notas |
|----|--------|------------------|-------|--------------|-------------|-----------|---------|-------------|-------|
| 1 | Nombre Empleado | Enfermería | 16/03/2026 | 6:52 | 15:00 | No | No | - | - |

### Hoja 2: "Resumen"
- Total de registros
- Total de faltas
- Días festivos
- Registros por departamento
- Tasa de asistencia por área

---

## 🛠️ Stack Tecnológico Recomendado

### **Opción 1: Python + Web (Recomendada)**
```
Frontend: React/Vue.js + TailwindCSS
Backend: Flask/FastAPI + Python
OCR: Tesseract OCR (free) o Google Cloud Vision
Database: PostgreSQL (opcional)
Excel: openpyxl, pandas
```

### **Opción 2: Full Stack JavaScript**
```
Frontend: React + TailwindCSS
Backend: Node.js + Express
OCR: Tesseract.js (cliente) o Google Cloud Vision
Database: MongoDB
Excel: ExcelJS
```

### **Opción 3: Bajo costo (Google Workspace)**
```
Google Sheets + Google Vision API
Apps Script para automatización
```

---

## 🔄 Flujo de Trabajo (UX)

```
1. Usuario sube PDF
   ↓
2. Sistema extrae datos (OCR)
   ↓
3. Muestra tabla con datos extraídos
   ↓
4. Usuario revisa/edita
   ↓
5. Usuario confirma datos
   ↓
6. Sistema genera Excel
   ↓
7. Usuario descarga archivo
```

---

## ⚙️ Funcionalidades Principales

### Fase 1 (MVP)
- [ ] Subida de PDF (1 archivo)
- [ ] OCR básico
- [ ] Extracción de nombres y horas
- [ ] Generación de Excel simple
- [ ] Descarga de archivo

### Fase 2
- [ ] Editor manual de datos
- [ ] Validación de formato
- [ ] Detección automática de festivos
- [ ] Histórico de extracciones

### Fase 3
- [ ] Subida de múltiples PDFs
- [ ] Base de datos
- [ ] Reportes y gráficos
- [ ] Integración con sistemas RH

---

## 📝 Detalles Técnicos Importantes

### Detección de Festivos
```python
# Detectar domingos, sábados
# Integrar calendario de días feriados México
```

### Validación de Horas
```python
# Formato HH:MM (validar rango 00:00 - 23:59)
# Detectar anomalías (ej: hora salida < hora entrada)
```

### Limpieza de OCR
```python
# Corregir errores comunes de OCR
# Normalizar espacios y caracteres especiales
# Manejar acentos correctamente
```

---

## 📦 Archivos Generados

La aplicación generará:
1. **Excel con datos completos** (plantilla de muestra incluida)
2. **Reporte en PDF** (opcional)
3. **CSV para importar a base de datos**

---

## 🚀 Próximos Pasos

¿Cuál es tu preferencia?

1. **Crear prototipo rápido** (Python + Web simple)
2. **Aplicación profesional** (Full stack React + Node/Python)
3. **Solución automatizada** (Google Sheets + Scripts)
4. **Otra opción específica** que tengas en mente

---

*Muestra de Excel incluida: `Muestra_Asistencia_PTDAM.xlsx`*
