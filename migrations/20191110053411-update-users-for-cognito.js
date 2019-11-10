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
  // mariadb fighting me over batching these...
  const sql = `
    ALTER TABLE users
    DROP COLUMN username;

    ALTER TABLE users
    DROP COLUMN email;

    ALTER TABLE users
    ADD COLUMN
      username VARCHAR(50) NOT NULL UNIQUE;

    ALTER TABLE users
    ADD COLUMN
      email VARCHAR(255) NOT NULL UNIQUE;
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
