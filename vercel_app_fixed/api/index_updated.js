const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const ExcelJS = require('exceljs');
const vision = require('@google-cloud/vision');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.raw({ type: 'application/pdf', limit: '50mb' }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Configurar Google Cloud Vision
const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CLOUD_VISION_KEY
    ? undefined
    : undefined,
  credentials: process.env.GOOGLE_CLOUD_VISION_KEY
    ? {
        type: 'service_account',
        project_id: 'asistencia-ptdam',
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
      }
    : undefined,
});

// Variables en memoria
let registros = [];
let idCounter = 1;

// HELPER: Extraer datos de texto OCR
function extractDataFromText(text) {
  const records = [];
  const lines = text.split('\n').filter(l => l.trim());

  let currentRecord = {
    nombre: '',
    departamento: '',
    fecha: '',
    entrada: '',
    salida: '',
    festivo: 'No',
    falta: 'No'
  };

  const departamentos = ['ENFERMERÍA', 'ABOGADO', 'ADMINISTRACIÓN', 'SEGURIDAD', 'MÉDICO'];
  const timeRegex = /(\d{1,2}):(\d{2})/g;

  for (let line of lines) {
    line = line.trim();

    // Detectar fechas (DD/MM/YYYY)
    if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(line)) {
      currentRecord.fecha = line.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0];
    }

    // Detectar horas
    const times = [...line.matchAll(timeRegex)];
    if (times.length >= 1) {
      currentRecord.entrada = `${times[0][1].padStart(2, '0')}:${times[0][2]}`;
    }
    if (times.length >= 2) {
      currentRecord.salida = `${times[1][1].padStart(2, '0')}:${times[1][2]}`;
    }

    // Detectar departamento
    for (let dept of departamentos) {
      if (line.toUpperCase().includes(dept)) {
        currentRecord.departamento = dept;
      }
    }

    // Detectar nombres (líneas largas en mayúsculas)
    if (line.length > 5 && line.toUpperCase() === line && !line.includes(':')) {
      if (currentRecord.nombre) {
        records.push({ ...currentRecord });
        currentRecord = {
          nombre: '',
          departamento: '',
          fecha: '',
          entrada: '',
          salida: '',
          festivo: 'No',
          falta: 'No'
        };
      }
      currentRecord.nombre = line;
    }

    // Detectar festivos y faltas
    if (line.toUpperCase().includes('FESTIVO') || line.toUpperCase().includes('DOMINGO')) {
      currentRecord.festivo = 'Sí';
    }
    if (line.toUpperCase().includes('FALTA') || line.toUpperCase().includes('AUSENCIA')) {
      currentRecord.falta = 'Sí';
    }
  }

  if (currentRecord.nombre) {
    records.push(currentRecord);
  }

  return records.filter(r => r.nombre);
}

// RUTAS API

app.get('/api/registros', (req, res) => {
  res.json(registros);
});

app.post('/api/registros', (req, res) => {
  const nuevoRegistro = {
    id: idCounter++,
    ...req.body,
    timestamp: new Date().toISOString()
  };
  registros.push(nuevoRegistro);
  res.json({ success: true, data: nuevoRegistro });
});

app.put('/api/registros/:id', (req, res) => {
  const idx = registros.findIndex(r => r.id == req.params.id);
  if (idx !== -1) {
    registros[idx] = { ...registros[idx], ...req.body };
    res.json({ success: true, data: registros[idx] });
  } else {
    res.status(404).json({ error: 'Registro no encontrado' });
  }
});

app.delete('/api/registros/:id', (req, res) => {
  const idx = registros.findIndex(r => r.id == req.params.id);
  if (idx !== -1) {
    registros.splice(idx, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Registro no encontrado' });
  }
});

// PROCESAR PDF CON GOOGLE VISION
app.post('/api/procesar-pdf', async (req, res) => {
  try {
    const { pdfBase64, fileName } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: 'No PDF provided' });
    }

    // Convertir base64 a buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Crear archivo temporal
    const tempPath = `/tmp/${Date.now()}.pdf`;
    fs.writeFileSync(tempPath, pdfBuffer);

    // Usar Google Cloud Vision para OCR
    const request = {
      requests: [
        {
          image: { content: pdfBuffer },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    };

    const [result] = await visionClient.batchAnnotateImages(request);
    const detections = result.responses[0];

    let extractedText = '';
    if (detections.textAnnotations && detections.textAnnotations.length > 0) {
      extractedText = detections.textAnnotations[0].description;
    }

    // Extraer datos del texto
    const extractedRecords = extractDataFromText(extractedText);

    // Agregar a registros
    const addedRecords = [];
    for (let record of extractedRecords) {
      const newRecord = {
        id: idCounter++,
        ...record,
        timestamp: new Date().toISOString()
      };
      registros.push(newRecord);
      addedRecords.push(newRecord);
    }

    // Limpiar archivo temporal
    fs.unlinkSync(tempPath);

    res.json({
      success: true,
      message: `Se extrajeron ${addedRecords.length} registros`,
      extractedText: extractedText.substring(0, 500), // Preview
      records: addedRecords
    });

  } catch (error) {
    console.error('Error procesando PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/export', async (req, res) => {
  try {
    const { datos } = req.body;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Asistencia');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 6 },
      { header: 'Nombre', key: 'nombre', width: 25 },
      { header: 'Departamento', key: 'departamento', width: 18 },
      { header: 'Fecha', key: 'fecha', width: 12 },
      { header: 'Entrada', key: 'entrada', width: 13 },
      { header: 'Salida', key: 'salida', width: 13 },
      { header: '¿Festivo?', key: 'festivo', width: 11 },
      { header: '¿Falta?', key: 'falta', width: 10 },
      { header: 'Notas', key: 'notas', width: 25 }
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F4E78' }
    };

    datos.forEach((dato, idx) => {
      sheet.addRow({
        id: dato.id,
        nombre: dato.nombre,
        departamento: dato.departamento,
        fecha: dato.fecha,
        entrada: dato.entrada,
        salida: dato.salida,
        festivo: dato.festivo,
        falta: dato.falta,
        notas: dato.notas || ''
      });

      if ((idx + 1) % 2 === 0) {
        sheet.getRow(idx + 2).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE7E6E6' }
        };
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Asistencia_${new Date().toISOString().split('T')[0]}.xlsx"`);
    res.send(buffer);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Servir HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
