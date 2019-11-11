const Db = require("../../../utils/db");
const apisauce = require("apisauce");
const mysql = require("mysql");

const api = apisauce.create({
  baseURL: `${process.env.WT_BACKEND_URL}`,
});

// need companies first
test.skip("POST /users/{userId} adds a user to a company", async done => {
  const payload = {
    userId: "todo",
    companyId: "todo",
  };

  const { status, data } = await api.post("/users", payload);
  expect(status).toBe(200);
  expect(data.message).toBe("Successfully added user to company");

  const db = Db.getConnection();
  const deleteRelationSql = `
    DELETE FROM 
    users_companies
    WHERE 
        user = UUID_TO_BIN(${mysql.escape(userId)})
    AND
        company = UUID_TO_BIN(${mysql.escape(companyId)});
  `;

  await Db.query(db, deleteRelationSql);

  done();
});
