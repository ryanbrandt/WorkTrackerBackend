const mysql = require("mysql");

module.exports = class Db {
  static getConnection() {
    const connection = mysql.createConnection({
      host: process.env.WORK_TRACKER_DB_HOST,
      user: process.env.WORK_TRACKER_DB_USER,
      passwod: process.env.WORK_TRACKER_DB_SECRET,
      database: "work_tracker",
    });
    connection.connect();
    return connection;
  }

  static query(db, sql) {
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          console.log(`query rejected: ${error}`);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};
