const mysql = require("mysql");

module.exports = class Db {
  static getConnection() {
    const connection = mysql.createConnection({
      host: process.env.WORK_TRACKER_DB_HOST,
      port: 3306,
      user: process.env.WORK_TRACKER_DB_USER,
      password: process.env.WORK_TRACKER_DB_SECRET,
      database: "worktracker",
    });
    connection.connect(err => {
      if (err) console.log(`Database connection error: ${err}`);
      else console.log("Database connection establish");
    });
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
