"use strict";
const Db = require("../../utils/db");
const mysql = require("mysql");

async function byUser(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

async function byCompany(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

async function create(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

async function deleteRecord(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

async function update(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

module.exports = {
  byUser: byUser,
  byCompany: byCompany,
  create: create,
  delete: deleteRecord,
  update: update,
};
