const Db = require("../utils/db");

test("Connects to the database", async done => {
  const db = Db.getConnection();
  db.destroy();
  done();
});
