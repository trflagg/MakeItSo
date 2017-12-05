var util = require('util');

module.exports = function(db) {

  var Model = require('argieDB/model')(db);

  Decision = function(doc) {
    Decision.super_.call(this, doc);
  }
  util.inherits(Decision, Model);

  Decision.prototype.initialize = function() {
    Decision.super_.prototype.initialize.call(this);

  }

  Decision.prototype.saveToDoc = function(doc) {
    Decision.super_.prototype.saveToDoc.call(this, doc);

    doc.ship = {};
    doc.ship._id = this.ship._id;
    this.ship.saveToDoc(doc.ship);
    doc.message = this.message;
    doc.command = this.command;
    doc.created = this.created;

    return doc;
  }

  Decision.prototype.loadFromDoc = function(doc) {
    Decision.super_.prototype.loadFromDoc.call(this, doc);

    this.ship = new Ship(doc.ship);
    this.message = doc.message;
    this.command = doc.command;
    this.created = doc.created;

  }

  Decision.prototype.fromShipCommandAndChild = function*(ship, message, command, child) {
    var shipCopy = {};
    this.ship = ship;
    this.message = message.message;
    this.command = command;
    if (child) {
      this.command = child + "." + command;
    }
    this.created = Date.now();

    yield db.save('Decision', this);
  }

  db.register('Decision', Decision);

  return Decision;
}




