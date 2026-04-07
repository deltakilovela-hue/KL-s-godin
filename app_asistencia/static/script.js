// Global variables
let tableData = [];
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadStatus = document.getElementById('uploadStatus');
const dataSection = document.getElementById('dataSection');
const exportSection = document.getElementById('exportSection');
const tableBody = document.getElementById('tableBody');
const spinner = document.getElementById('spinner');
const addRowBtn = document.getElementById('addRowBtn');
const validateBtn = document.getElementById('validateBtn');
const exportBtn = document.getElementById('exportBtn');
const validationResult = document.getElementById('validationResult');

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        uploadFile(e.target.files[0]);
    }
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');

    if (e.dataTransfer.files.length > 0) {
        uploadFile(e.dataTransfer.files[0]);
    }
});

addRowBtn.addEventListener('click', addTableRow);
validateBtn.addEventListener('click', validateData);
exportBtn.addEventListener('click', exportToExcel);

// Functions
function uploadFile(file) {
    if (file.type !== 'application/pdf') {
        showStatus('error', '❌ Solo se permiten archivos PDF');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    showSpinner(true);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            showSpinner(false);

            if (data.success) {
                tableData = data.data;
                showStatus('success', '✓ PDF procesado correctamente');
                displayTable();
                setTimeout(() => {
                    dataSection.style.display = 'block';
                    exportSection.style.display = 'block';
                    document.querySelector('.data-section').scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                showStatus('error', '❌ ' + data.error);
            }
        })
        .catch(error => {
            showSpinner(false);
            showStatus('error', '❌ Error: ' + error.message);
        });
}

function displayTable() {
    tableBody.innerHTML = '';

    tableData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${row.id}" data-field="id" onchange="updateRow(${index})"></td>
            <td><input type="text" value="${row.nombre}" data-field="nombre" onchange="updateRow(${index})"></td>
            <td><input type="text" value="${row.departamento}" data-field="departamento" onchange="updateRow(${index})"></td>
            <td><input type="date" value="${convertDateToInput(row.fecha)}" data-field="fecha" onchange="updateRow(${index})"></td>
            <td><input type="time" value="${row.hora_entrada}" data-field="hora_entrada" onchange="updateRow(${index})"></td>
            <td><input type="time" value="${row.hora_salida}" data-field="hora_salida" onchange="updateRow(${index})"></td>
            <td>
                <select data-field="festivo" onchange="updateRow(${index})">
                    <option value="No" ${row.festivo === 'No' ? 'selected' : ''}>No</option>
                    <option value="Sí" ${row.festivo === 'Sí' ? 'selected' : ''}>Sí</option>
                </select>
            </td>
            <td>
                <select data-field="falta" onchange="updateRow(${index})">
                    <option value="No" ${row.falta === 'No' ? 'selected' : ''}>No</option>
                    <option value="Sí" ${row.falta === 'Sí' ? 'selected' : ''}>Sí</option>
                </select>
            </td>
            <td><input type="date" value="${convertDateToInput(row.fecha_falta)}" data-field="fecha_falta" onchange="updateRow(${index})"></td>
            <td><input type="text" value="${row.notas}" data-field="notas" onchange="updateRow(${index})"></td>
            <td><button class="btn btn-danger" onclick="deleteRow(${index})">🗑️ Eliminar</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateRow(index) {
    const row = document.querySelectorAll('#tableBody tr')[index];
    const inputs = row.querySelectorAll('input, select');

    const updatedData = {};
    inputs.forEach(input => {
        const field = input.getAttribute('data-field');
        updatedData[field] = input.value;
    });

    tableData[index] = { ...tableData[index], ...updatedData };
}

function addTableRow() {
    const newId = Math.max(...tableData.map(r => parseInt(r.id) || 0), 0) + 1;
    const newRow = {
        id: newId.toString(),
        nombre: '',
        departamento: '',
        fecha: new Date().toISOString().split('T')[0],
        hora_entrada: '',
        hora_salida: '',
        festivo: 'No',
        falta: 'No',
        fecha_falta: '',
        notas: ''
    };

    tableData.push(newRow);
    displayTable();
}

function deleteRow(index) {
    if (confirm('¿Deseas eliminar esta fila?')) {
        tableData.splice(index, 1);
        displayTable();
    }
}

function convertDateToInput(dateStr) {
    if (!dateStr) return '';
    // Convertir de DD/MM/YYYY a YYYY-MM-DD
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
}

function convertDateFromInput(dateStr) {
    if (!dateStr) return '';
    // Convertir de YYYY-MM-DD a DD/MM/YYYY
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}

function validateData() {
    const dataToValidate = tableData.map(row => ({
        ...row,
        fecha: convertDateFromInput(row.fecha),
        fecha_falta: convertDateFromInput(row.fecha_falta)
    }));

    fetch('/api/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToValidate)
    })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                validationResult.innerHTML = '✓ Todos los datos son válidos y listos para exportar';
                validationResult.classList.remove('invalid');
                validationResult.classList.add('valid');
            } else {
                const errorList = data.errors.map(err => `<li>${err}</li>`).join('');
                validationResult.innerHTML = `<strong>❌ Se encontraron errores:</strong><ul>${errorList}</ul>`;
                validationResult.classList.remove('valid');
                validationResult.classList.add('invalid');
            }
            validationResult.style.display = 'block';
        })
        .catch(error => {
            validationResult.innerHTML = `❌ Error: ${error.message}`;
            validationResult.classList.add('invalid');
            validationResult.style.display = 'block';
        });
}

function exportToExcel() {
    // Convertir fechas al formato esperado
    const dataToExport = tableData.map(row => ({
        ...row,
        fecha: convertDateFromInput(row.fecha),
        fecha_falta: convertDateFromInput(row.fecha_falta)
    }));

    showSpinner(true);

    fetch('/api/export', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataToExport })
    })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Error generating Excel');
        })
        .then(blob => {
            showSpinner(false);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Asistencia_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showStatus('success', '✓ Excel descargado correctamente');
        })
        .catch(error => {
            showSpinner(false);
            showStatus('error', '❌ Error: ' + error.message);
        });
}

function showStatus(type, message) {
    uploadStatus.innerHTML = message;
    uploadStatus.className = `upload-status ${type}`;
}

function showSpinner(show) {
    spinner.style.display = show ? 'flex' : 'none';
}

// Disable right-click for better UX
uploadArea.addEventListener('contextmenu', (e) => e.preventDefault());
