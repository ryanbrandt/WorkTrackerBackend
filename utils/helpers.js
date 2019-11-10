const validator = require("validator");

/**
 * UUID validator
 * @param {string[] | string} ids list of ids or single id
 * @returns {boolean} if valid UUIDs
 */
function isValidUUIDs(ids) {
  if (Array.isArray(ids)) {
    for (let id of ids) {
      if (typeof id !== "string" || !validator.isUUID(id)) {
        return false;
      }
    }
    return true;
  }
  if (typeof ids !== "string" || !validator.isUUID(ids)) {
    return false;
  }
  return true;
}

module.exports = {
  isValidUUIDs: isValidUUIDs,
};
