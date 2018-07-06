// Each regex functionBody MUST return a Promise

var Promise = require('promise')
, _ = require('lodash');

module.exports = regExList = [
// clearScreen
{
    functionName: 'clearScreen'
    , placeholder: '{% CLEAR_SCREEN %}'
    , regEx: /^{% CLEAR_SCREEN %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(function(resolve, reject) {
            $output.empty();
            resolve($output);
        });
    }
}

// wait
, {
    functionName: 'wait'
    , placeholder: '{% WAIT(%d) %}'
    , regEx: /^{% WAIT\((\d+)\) %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {resolve($output)}, args[1]);
        });
    }
}
// startChat
, {
    functionName: 'startChat'
    , placeholder: '{% START_CHAT %}'
    , regEx: /^{% START_CHAT %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(function(resolve, reject) {
          console.log(this);
            this.revealLines = false;
            var $innerDiv = $("<div></div>").addClass('chat');
            $output.append($innerDiv);
            resolve($innerDiv);
        }.bind(this));
    }
}

// endChat
, {
    functionName: 'endChat'
    , placeholder: '{% END_CHAT %}'
    , regEx: /^{% END_CHAT %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(_.bind(function(resolve, reject) {
            this.revealLines = true;
            var $outDiv = $output.parent();
            resolve($outDiv);
        }, this));
    }
}

// startPrintout
, {
    functionName: 'startPrintout'
    , placeholder: '{% START_PRINTOUT %}'
    , regEx: /^{% START_PRINTOUT %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(_.bind(function(resolve, reject) {
            var $innerDiv = $("<div></div>").addClass("printout");
            $output.append($innerDiv);
            resolve($innerDiv);
        }, this));
    }
}

// endPrintout
, {
    functionName: 'endPrintout'
    , placeholder: '{% END_PRINTOUT %}'
    , regEx: /^{% END_PRINTOUT %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(_.bind(function(resolve, reject) {
            var $outDiv = $output.parent();
            resolve($outDiv);
        }, this));
    }
}
];
