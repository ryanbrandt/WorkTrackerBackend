const apisauce = require("apisauce");
const mysql = require("mysql");
const Db = require("../../../utils/db");

const api = apisauce.create({
  baseURL: `${process.env.WT_BACKEND_URL}`,
});

test("GET /companies returns all companies", async done => {
  const countSql = `
        SELECT COUNT(*)
        FROM companies
    `;

  const db = Db.getConnect();
  const results = await Db.query(db, countSql);
  const { count } = results;

  const { status, data } = await api.get("/companies");
  expect(status).toBe(200);
  expect(data.length).toBe(count);

  done();
});

test("POST /companies creates a new company", async done => {
  const payload = {
    name: "not a real company",
    logoUri: "DNE",
    industry: "technology",
  };

  const { status, data } = await api.post("/companies", payload);
  expect(status).toBe(200);
  expect(data.message).toBe("Company successfully added");

  const deleteInsertSql = `
    DELETE FROM companies
    WHERE name = ${mysql.escape(payload.name)};
  `;

  await Db.query(db, deleteInsertSql);

  done();
});
