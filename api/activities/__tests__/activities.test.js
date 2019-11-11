const apisauce = require("apisauce");
const mysql = require("mysql");
const uuid = require("uuid");
const Db = require("../../../utils/db");

const api = apisauce.create({
  baseURL: `${process.env.WT_BACKEND_URL}`,
});

test("POST /activities creates a new activity", async done => {
  done();
});

test("GET /activities/{userId} gets activities related to a user", async done => {
  done();
});

test("GET /activities/company/{companyId} gets activities related to a company", async done => {
  done();
});

test("GET /activities gets all activities", async done => {
  done();
});
