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
    CREATE FUNCTION UUID_TO_BIN(_uuid BINARY(36))
      RETURNS BINARY(16)
      LANGUAGE SQL  DETERMINISTIC  CONTAINS SQL  SQL SECURITY INVOKER
    RETURN
      UNHEX(CONCAT(
          SUBSTR(_uuid, 15, 4),
          SUBSTR(_uuid, 10, 4),
          SUBSTR(_uuid,  1, 8),
          SUBSTR(_uuid, 20, 4),
          SUBSTR(_uuid, 25))
      );
    
      CREATE FUNCTION BIN_TO_UUID(_bin BINARY(16))
        RETURNS VARCHAR(36)
        LANGUAGE SQL  DETERMINISTIC  CONTAINS SQL  SQL SECURITY INVOKER
      RETURN
        UCASE(CONCAT_WS('-',
            HEX(SUBSTR(_bin,  5, 4)),
            HEX(SUBSTR(_bin,  3, 2)),
            HEX(SUBSTR(_bin,  1, 2)),
            HEX(SUBSTR(_bin,  9, 2)),
            HEX(SUBSTR(_bin, 11))
        ));
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP FUNCTION UUID_TO_BIN;
    DROP FUNCTION BIN_TO_UUID;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
