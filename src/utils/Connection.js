import mysql from 'mysql2/promise'

const databasePort = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3009;

console.log(process.env.DATABASE_HOST,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,process.env.DATABASE_NAME)
const access = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: databasePort,
  database: process.env.DATABASE_NAME,
};

const con = mysql.createPool(access);

export default con

// import mysql, { ConnectionOptions } from 'mysql2/promise'

// const databasePort: number = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3009;
// const access: ConnectionOptions = {
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   port: databasePort,
//   database: process.env.DATABASE_NAME,
// };

// const con = mysql.createPool(access);

// export default con

// import mysql, { ConnectionOptions } from 'mysql2/promise'

// const access: ConnectionOptions = {
//   host: 'localhost',
//   user: 'root',
//   password: "techhira@123",
//   port: 3306,
//   database: 'dsg',
// };

// const con = mysql.createConnection(access);

// export default con

