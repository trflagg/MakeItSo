// Each regex functionBody MUST return a Promise

var Promise = require('promise');

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
            var $innerDiv = $("<div></div>").addClass('chat');
            $output.append($innerDiv);
            resolve($innerDiv);
        });
    }
}

// endChat
, {
    functionName: 'endChat'
    , placeholder: '{% END_CHAT %}'
    , regEx: /^{% END_CHAT %}/
    , promiseForLine: function(line, $output, args) {
        return new Promise(function(resolve, reject) {
            var $outDiv = $output.parent();
            resolve($outDiv);
        });
    }
}];
