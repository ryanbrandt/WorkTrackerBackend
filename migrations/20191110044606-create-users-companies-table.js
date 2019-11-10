"use strict";

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const sql = `
    CREATE TABLE users_companies(
      user BINARY(16) NOT NULL,
      company BINARY(16) NOT NULL,
      CONSTRAINT user_user_companies_fk FOREIGN KEY(user) REFERENCES users(id),
      CONSTRAINT company_users_companies_fk FOREIGN KEY(company) REFERENCES companies(id),
      PRIMARY KEY(user, company)
    );
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP TABLE users_companies;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
