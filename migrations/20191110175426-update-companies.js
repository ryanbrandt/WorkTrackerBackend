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
    ALTER TABLE companies
    ADD COLUMN
      industry VARCHAR(50) DEFAULT NULL;

    ALTER TABLE companies
    ADD CONSTRAINT
      companies_name_uq UNIQUE(name);
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
