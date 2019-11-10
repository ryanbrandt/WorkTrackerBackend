"use strict";

const Db = require("../../utils/db");
const mysql = require("mysql");

async function list(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const selectSql = `
    SELECT * 
    FROM companies;
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const results = await Db.query(db, selectSql);

    if (results.length) {
      payload = Response.basic(200, results);
    } else {
      payload = Response.basic(404, "No companies currently exist in DB");
    }
  } catch (e) {
    payload = Response.basic(
      500,
      `An error occurred retrieving companies: ${e}`
    );
  } finally {
    db.destroy();
  }

  return payload;
}

async function create(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const { body } = event;
  const { name, logoUri = null, industry = null } = body;

  const insertSql = `
    INSERT INTO companies(
      name,
      logoUri,
      industry
    )
    VALUES(
      ${mysql.escape(name)},
      ${mysql.escape(logoUri)},
      ${mysql.escape(industry)}
    );
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const insertResults = await Db.query(db, insertSql);

    if (insertResults.affectedRows) {
      payload = Response.basic(200, "Company successfully added");
    } else {
      payload = Response.basic(400, "Company insert failed");
    }
  } catch (e) {
    payload = Response.basic(
      500,
      `An error occurred during company insert: ${e}`
    );
  } finally {
    db.destroy();
  }

  return payload;
}

module.exports = {
  list: list,
  create: create,
};
