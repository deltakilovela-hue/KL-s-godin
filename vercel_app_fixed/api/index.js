const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const ExcelJS = require('exceljs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Variables en memoria
let registros = [];
let idCounter = 1;

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

app.post('/api/export', async (req, res) => {
  try {
    const { datos } = req.body;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Asistencia');

    // Headers
    sheet.columns = [
      { header: 'ID', key: 'id', width: 6 },
      { header: 'Nombre', key: 'nombre', width: 25 },
      { header: 'Departamento', key: 'departamento', width: 18 },
      { header: 'Fecha', key: 'fecha', width: 12 },
      { header: 'Entrada', key: 'entrada', width: 13 },
      { header: 'Salida', key: 'salida', width: 13 },
      { header: '¿Festivo?', key: 'festivo', width: 11 },
      { header: '¿Falta?', key: 'falta', width: 10 },
      { header: 'Fecha Falta', key: 'fechafalta', width: 12 },
      { header: 'Notas', key: 'notas', width: 25 }
    ];

    // Formatear headers
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F4E78' }
    };

    // Agregar datos
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
        fechafalta: dato.fechafalta,
        notas: dato.notas
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

// Servir HTML principal en cualquier ruta no API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
