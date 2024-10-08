const sql = require('mssql');
const {Connection} = require('tedious');

const config = {
    user: 'LAPTOP-0O305MC1\LOCALDB#10D714B4',
    password: '',
    server: '(localdb)\Madelyng',
    database: 'ColabPro',
    options: {
        encrypt: true, // Si usas Azure
        trustServerCertificate: true // Cambia según tu entorno
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.error('Error de conexión a SQL Server:', err));

module.exports = {
    sql,
    poolPromise
};