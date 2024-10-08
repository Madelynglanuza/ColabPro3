const express = require('express');
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

}) 
.catch(err => {
    console.error('Error al conectar a sql server:', err);

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

