"use strict";

const Db = require("../../utils/db");
const Response = require("../../utils/response");
const mysql = require("mysql");

async function list(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const selectSql = `
    SELECT * 
    FROM activities;
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const results = await Db.query(db, selectSql);

    if (results.length) {
      payload = Response.withPayload(200, results);
    } else {
      payload = Response.basic(404, "No activities currently exist in DB");
    }
  } catch (e) {
    payload = Response.basic(
      500,
      "An error occured retrieving activities data"
    );
  } finally {
    db.destroy();
  }

  return payload;
}

async function byCompany(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const { pathParameters } = event;
  const { companyId } = pathParameters;

  const selectSql = `
    SELECT DISTINCT(a.id), a.name
    FROM 
      records 
      AS r
    JOIN
      companies
      AS c
    JOIN 
      activities
      AS a
    ON 
      r.company = c.id
    AND
      r.activity = a.id
    WHERE
      c.id = UUID_TO_BIN(${mysql.escape(companyId)}); 
  `;

  const db = Db.getConnection();
  let payload;

  try {
    const results = await Db.query(db, selectSql);

    if (results.length) {
      payload = Response.withPayload(200, results);
    } else {
      payload = Response.basic(
        404,
        "No activities currently exist for this company"
      );
    }
  } catch (e) {
    payload = Response.basic(
      500,
      `An error occurred retrieving activities by company: ${e}`
    );
  } finally {
    db.destroy();
  }

  return payload;
}

async function byUser(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const { pathParameters } = event;
  const { userId } = pathParameters;

  const selectSql = `
    SELECT DISTINCT(a.id), a.name
    FROM
      records
      AS r
    JOIN
      users
      AS u
    JOIN 
      activities
      AS a
    ON
      r.user = u.id
    AND
      r.activity = a.id
    WHERE 
      u.id = UUID_TO_BIN(${mysql.escape(userId)});
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const results = Db.query(db, selectSql);

    if (results.length) {
      payload = Response.withPayload(200, results);
    } else {
      payload = Response.basic(
        404,
        "No activities currently exist for this user"
      );
    }
  } catch (e) {
    payload = Response.basic(
      500,
      `An error occurred retrieving activities by user ${e}`
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
  const { id, name } = JSON.parse(body);

  const insertSql = `
    INSERT INTO activities(
      id,
      name
    )
    VALUES(
      UUID_TO_BIN(${mysql.escape(id)}),
      ${name}
    );
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const results = await Db.query(db, insertSql);

    if (results.affectedRows) {
      payload = Response.basic(201, "Activity successfully created");
    } else {
      payload = Response.basic(400, "Failed to create new activity");
    }
  } catch (e) {
    payload = Response.basic(
      500,
      `An error occurred during activity insert ${e}`
    );
  } finally {
    db.destroy();
  }

  return payload;
}

module.exports = {
  list: list,
  byCompany: byCompany,
  byUser: byUser,
  create: create,
};
