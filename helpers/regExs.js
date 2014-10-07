var systemWrapper = require('argie/models/systemWrapper');
var regExs = require('../client/js/regExList');

module.exports.registerRegExs = function() {
  for(var i=0, ll=regExs.length; i<ll; i++) {
    systemWrapper.prototype.registerRegEx(regExs[i]);
  }
}
