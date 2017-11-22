var util = require('util');

module.exports = function(db) {

  var Model = require('argieDB/model')(db);

  Decision = function(doc) {
    Decision.super_.call(this, doc);
  }
  util.inherits(Decision, Model);

  Decision.prototype.initialize = function() {
    Decision.super_.prototype.initialize.call(this);

    this.command = "";
    this.child = "";
    this.child = null;
    this.lastResult = "";
    this.globals = null;
    this.bNums = null;
  }

  Decision.prototype.saveToDoc = function(doc) {
    Decision.super_.prototype.saveToDoc.call(this, doc);

    doc.command = this.command;
    doc.child = this.child;
    doc.lastResult = this.lastResult;
    doc.globals = this._globals;
    doc.bNums = this._bNums;
    doc.created = this.created;

    return doc;
  }

  Decision.prototype.loadFromDoc = function(doc) {
    Decision.super_.prototype.loadFromDoc.call(this, doc);

    this.command = doc.command;
    this.child = doc.child;
    this.lastResult = doc.lastResult;
    this.globals = doc._globals;
    this.bNums = doc._bNums;
    this.created = doc.created;

  }

  Decision.prototype.fromShipCommandAndChild = function*(ship, command, child) {
    this.command = command;
    this.child = child;
    this.lastResult = ship.lastResult;
    this.globals = ship._globals;
    this.bNums = ship._bNums;
    this.created = Date.now();


    yield db.save('Decision', this);
  }

  db.register('Decision', Decision);

  return Decision;
}




