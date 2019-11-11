const apisauce = require("apisauce");
const mysql = require("mysql");
const uuid = require("uuid");
const Db = require("../../../utils/db");

const api = apisauce.create({
  baseURL: `${process.env.WT_BACKEND_URL}`,
});

test("GET /companies returns all companies", async done => {
  const countSql = `
        SELECT COUNT(*) 
        AS count
        FROM companies
    `;

  const db = Db.getConnection();

  const results = await Db.query(db, countSql);
  const { count } = results[0];
  const { status, data } = await api.get("/companies");

  if (count < 1) {
    expect(status).toBe(404);
    expect(data.message).toBe("No companies currently exist in DB");
  } else {
    expect(status).toBe(200);
    expect(data.length).toBe(count);
  }

  db.destroy();
  done();
});

test("POST /companies creates a new company", async done => {
  const payload = {
    id: uuid.v4(),
    name: "not a real company",
    logoUri: "DNE",
    industry: "technology",
  };

  const { status } = await api.post("/companies", payload);
  expect(status).toBe(200);

  const db = Db.getConnection();
  const verificationSql = `
    SELECT *
    FROM companies
    WHERE name = ${mysql.escape(payload.name)};
  `;

  const verificationResults = await Db.query(db, verificationSql);
  expect(verificationResults.length).toBe(1);

  const deleteInsertSql = `
    DELETE FROM companies
    WHERE name = ${mysql.escape(payload.name)};
  `;

  await Db.query(db, deleteInsertSql);

  db.destroy();
  done();
});
