const express = require('express');
const path = require('path');
const sql = require('mssql'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');

// Importa las nuevas rutas
const fileRoutes = require('./routes/fileRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');
const teamMemberRoutes = require('./routes/teamMemberRoutes.js');
const calendarEventRoutes = require('./routes/calendarEventRoutes.js');
const { pool } = require('mssql');


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
// Configuracion de la conexion a sql server
const dbConfig = {
    user: 'LAPTOP-0O305MC1\LOCALDB#10D714B4',
    password: '',
    server: '(localdb)\Madelyng',
    database: 'ColabPro',
    options: {
        encrypt: true, // Si usas Azure
        trustServerCertificate: true // Cambia según tu entorno
    }
};
// Ruta para crear un nuevo proyecto
app.post('/api/projects', async (req, res) => {
    const { projectName, projectDescription, startDate, endDate, budget, status, collaborators } = req.body;

    try {
        // Conectar a la base de datos
        await sql.connect(dbConfig);

        // Insertar el nuevo proyecto en la base de datos
        const result = await sql.query`INSERT INTO Projects (Name, Description, StartDate, EndDate, Budget, Status) VALUES (${projectName}, ${projectDescription}, ${startDate}, ${endDate}, ${budget}, ${status})`;

        // Aquí puedes agregar la lógica para insertar los colaboradores si es necesario

        res.status(201).json({ message: 'Proyecto creado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el proyecto' });
    } finally {
        // Cerrar la conexión
        await sql.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:${port}');
});
// Conectar a la base de datos
sql.connect(dbConfig)
.then(pool => {
    console.log('Conectado a sql server');

// Usa las rutas existentes
app.use('/api/projects', projectRoutes(pool));
app.use('/api/tasks', taskRoutes(pool));
app.use('/api/users', userRoutes(pool));
app.use('/api/chats', chatRoutes(pool));
app.use('/api/notifications', notificationRoutes(pool));

// Usa las nuevas rutas
app.use('/api/files', fileRoutes(pool));
app.use('/api/feedback', feedbackRoutes(pool));
app.use('/api/team-members', teamMemberRoutes(pool));
app.use('/api/calendar-events', calendarEventRoutes(pool));

// Código que te envié anteriormente
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'ColabPro')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'calendar.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'create-project.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'progress-tracking.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project-detalles.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

}) 
.catch(err => {
    console.error('Error al conectar a sql server:', err);

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});