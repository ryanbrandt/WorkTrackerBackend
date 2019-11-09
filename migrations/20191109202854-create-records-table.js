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
    CREATE TABLE records(
      id BINARY(16) NOT NULL,
      user BINARY(16) NOT NULL,
      activity BINARY(16) NOT NULL,
      company BINARY(16) DEFAULT NULL,
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL,
      CONSTRAINT records_user_fk FOREIGN KEY(user) REFERENCES users(id),
      CONSTRAINT records_acivity_fk FOREIGN KEY(activity) REFERENCES activities(id),
      CONSTRAINT records_company_fk FOREIGN KEY(company) REFERENCES companies(id)
    );
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP TABLE records;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
