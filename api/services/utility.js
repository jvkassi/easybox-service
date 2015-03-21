// Utility functions
var _ = require('lodash');
utility = {
  // translate Error codes
  translateErrorCode: function (errors, res) {
    var translated = [];
    errors.forEach(function (error) {
      // (res.i18n(error));
      translated.push(res.i18n(error));
    });
    return translated;
  },
  // ValidateToken
  translateSchema: function (schema, res) {
    schema = _.omit(schema, [
      'id',
      'createdAt',
      'updatedAt',
      'autoIncrement'
    ]);
    return _.forIn(schema, function (v, k) {
      console.log(v);
      v.display = res.i18n(k);
      v[''];
      return v;
    });
  }
};
module.exports = utility;