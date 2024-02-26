import mysql from "mysql"

export const db = mysql.createConnection({
  database: process.env.MYSQLDATABASE,
  user:process.env.MYSQLUSER,
  password:process.env.MYSQLPASSWORD,
  host:process.env.MYSQLHOST,
  port:process.env.MYSQLPORT
  // secureAuth: true
})
