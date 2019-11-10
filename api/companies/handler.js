"use strict";

const Db = require("../../utils/db");
const mysql = require("mysql");

async function list(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

async function create(event, context) {
  if (event.source === "serverless-plugin-warmup") {
    return "Lambda is warm!";
  }
}

module.exports = {
  list: list,
  create: create,
};
