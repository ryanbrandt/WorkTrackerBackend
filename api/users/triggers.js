"use strict";

const Db = require("../../utils/db");
const mysql = require("mysql");

async function postConfirmation(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }

  const { userAttributes, username } = event.request;
  const { email, uuid } = userAttributes;

  const existenceSql = `
    SELECT * 
    FROM users
    WHERE id = UUID_TO_BIN(${mysql.escape(id)});
  `;

  const updateSql = `
    UPDATE users
    SET 
        username = ${mysql.escape(username)},
        email = ${mysql.escape(email)}
    WHERE id = UUID_TO_BIN(${mysql.escape(id)});
  `;

  const insertSql = `
    INSERT INTO users(
        username,
        email,
    )
    VALUES(
        ${mysql.escape(username)},
        ${mysql.escape(email)}
    );
  `;

  const db = Db.getConnection();

  try {
    const userExistsResults = await Db.query(db, existenceSql);

    if (userExistsResults.length === 0) {
      const insertResults = await Db.query(db, insertSql);
      if (insertResults.affectedRows) {
        console.log(`User successfully created: ${email}/${username}`);
      } else {
        console.log(`User creation failed: ${email}/${username}`);
      }
      context.done(null, event);
    }

    const updateResults = await Db.query(db, updateSql);
    if (updateResults.affectedRows) {
      console.log(`User successfully updated: ${email}/${username}`);
    } else {
      console.log(`User update failed: ${email}/${username}`);
    }
    context.done(null, event);
  } catch (e) {
    console.log(`Cognito post confirmation error: ${e}`);
  }
}

module.exports = {
  postConfirmation: postConfirmation,
};
