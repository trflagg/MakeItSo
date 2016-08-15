// Each regex functionBody MUST return a Promise

var Promise = require('promise');

module.exports = regExList = [
// clearScreen
{
    functionName: 'clearScreen'
    , placeholder: '{% CLEAR_SCREEN %}'
    , regEx: /^{% CLEAR_SCREEN %}/
    , functionBody: function(lines, $output, args) {
        $output.empty();
        return lines;
    }
}

// wait
, {
    functionName: 'wait'
    , placeholder: '{% WAIT(%d) %}'
    , regEx: /^{% WAIT\((\d+)\) %}/
    , functionBody: function(lines, $output, args) {
        var gameScreen = this;
        // set semaphore to say someone is waiting
        this.waiters++;
        setTimeout(function() {
            // unset to say we're done
            gameScreen.waiters--;
            gameScreen.outputLines(lines, $output);
        }, args[1])
        return [];
    }
}

// startChat
, {
    functionName: 'startChat'
    , placeholder: '{% START_CHAT %}'
    , regEx: /^{% START_CHAT %}/
    , functionBody: function(lines, $output, args) {
        var $innerDiv = $("<div></div>").addClass('chat');
        $output.append($innerDiv);
        return this.outputLines(lines, $innerDiv);
    }
}

// endChat
, {
    functionName: 'endChat'
    , placeholder: '{% END_CHAT %}'
    , regEx: /^{% END_CHAT %}/
    , functionBody: function(lines, $output, args) {
        var $outDiv = $output.parent()
        return this.outputLines(lines, $outDiv);
    }
}];
