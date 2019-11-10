"use strict";

const Db = require("../../utils/db");
const Response = require("../../utils/response");
const helpers = require("../../utils/helpers");
const mysql = require("mysql");

async function addToCompany(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const { queryStringParameters, pathParameters } = event;
  const { userId } = pathParameters;
  const { companyId } = queryStringParameters;

  if (!helpers.isValidUUIDs([userId, companyId])) {
    return Response.basic(400, "Invalid UUIDs provided");
  }

  const sql = `
    INSERT INTO users_companies(
        user, 
        company
    )
    VALUES(
        UUID_TO_BIN(${mysql.escape(userId)}), 
        UUID_TO_BIN(${mysql.escape(companyId)})
    );
  `;

  const db = Db.getConnection();
  let payload;
  try {
    const insertResults = await Db.query(db, sql);

    if (insertResults.affectedRows) {
      payload = Response.basic(200, "Successfully added user to company");
    } else {
      payload = Response.basic(400, "Failed to add user to company");
    }
  } catch (e) {
    payload = Response.basic(500, "An error occured during user_compay insert");
  } finally {
    db.destroy();
  }
  return payload;
}

module.exports = {
  addToCompany: addToCompany,
};
