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
    CREATE TABLE users(
      id BINARY(16) NOT NULL,
      username VARCHAR(30) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      PRIMARY KEY(id)
    );
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP TABLE users;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
