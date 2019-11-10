const mysql = require("mysql");

test("Connects to the database", async done => {
  const connection = mysql.createConnection({
    host: process.env.WORK_TRACKER_DB_HOST,
    port: 3306,
    user: process.env.WORK_TRACKER_DB_USER,
    password: process.env.WORK_TRACKER_DB_SECRET,
    database: "worktracker",
  });
  connection.connect(err => {
    expect(err).toBe(undefined);
  });
  connection.destroy();
  done();
});
