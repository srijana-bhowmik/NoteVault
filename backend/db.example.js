const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "your_mysql_user",
    password: "your_mysql_password",
    database: "notes_app",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;
