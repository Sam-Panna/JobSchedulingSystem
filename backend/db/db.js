import sql from "mysql2"
const db = sql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "12345",
        database : "job_system"
    }
)

export default db;