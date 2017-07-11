import React from 'react';
import _ from 'lodash';

let regExList = require('../../../regExList');
let regExLines = require('../../../regExLines');

class GameScreen  extends React.Component {
  constructor(props) {
    super(props);
    this.revealLines = true;
  }

  componentDidMount() {
    this.outputLastResult(this.props.lastResult);
  }

  outputLastResult(lastResult) {
    let lines = '';
    let $outputdiv = $('div.output > div');

    if (this.props.outputBegin) {
      this.props.outputBegin();
    }

    if (lastResult) {
      lines = lastResult.split('\n');
    }

    this.outputLines(lines, $outputdiv)
      .then(() => {
        if (this.props.outputDone) {
          this.props.outputDone();
        }
      });
  }

  outputLines(lines, $output) {
    let p = Promise.resolve($output)
        , gameScreen = this;

    lines.filter(function(line) {
      return line.length > 0;
    }).forEach(function(line) {
      p = p.then(function($nextOutput) {
        let nextPromise =  gameScreen.funcForLine(line)($nextOutput);
        gameScreen.scrollToBottom($('.output'));

        return nextPromise;
      });
    }, this);

    return p;
  }

  funcForLine(line) {
    let gamescreen = this;

    return function($output){
      return gamescreen.promiseforline(line, $output);
    }
  }

  promiseforline(line, $output) {
    let promiseResult = null
        , print = true;

    // first check if it is regexlist
    let regExResultsArray = null;
    _.each(regExList, function(regEx) {
      regExResultsArray = regEx.regEx.exec(line);
      if (regExResultsArray != null) {
        promiseResult = regEx.promiseForLine.call(this, line, $output, regExResultsArray);
        print = false;
      }
    }, this);

    // not a regEx, so make a promise to print it
    if (print) {
      // match against regExLines which may modify our output line
      _.each(regExLines, function(regEx) {
        regExResultsArray = regEx.regEx.exec(line);
        if (regExResultsArray != null) {
          line = regEx.transformLine.call(this, line, regExResultsArray);
        }
      }, this);

      // print it!
      promiseResult = this.printLine(line, $output);

    }

    return promiseResult;
  }

  printLine(line, $outputDiv) {
    return new Promise(_.bind(function(resolve, reject) {
      let charTime = 30;
      let breakCount = 20;

      let $newDiv = $("<p></p>").addClass("outputText");
      $outputDiv.append($newDiv);

      if (this.revealLines) {
        // function to add a single character from the front of the line
        // to the $newDiv. If it's an html tag, add that all at once
        let gameScreen = this;
        let addNextChar = function(currentLine, lineRemaining, charCount) {
          // check for html tag
          var tagArray = lineRemaining.split(/^(<.*?>)/);
          if (tagArray.length > 1) {
            currentLine += tagArray[1];
            $newDiv.html(currentLine);
            if (tagArray[2]) {
              // html tags don't really count as a char for scrolling purposes,
              // so don't bother incrementing
              return addNextChar(currentLine, tagArray[2], charCount);
            }
            else {
              return resolve($outputDiv);
            }
          }
          else {
            // grab first letter
            console.log(lineRemaining[0]);
            currentLine += lineRemaining[0];
            lineRemaining = lineRemaining.slice(1);
            $newDiv.html(currentLine);
          }

          // scroll to bottom every breakCount characters
          if (charCount % breakCount == 0) {
            // HUGE TODO
            // I'm really going to have to fix this when there are other outputs to be printing to
            gameScreen.scrollToBottom($('.output'));
          }

          // do we keep going?
          if (lineRemaining.length > 0) {
            setTimeout(addNextChar, charTime, currentLine, lineRemaining, charCount + 1);
          }
          else {
            resolve($outputDiv);
          }
        } //addNextChar()
        addNextChar("", line, 0);
      } else {
        $newDiv.html(line);
        resolve($outputDiv);
      }
    }, this));
  }

  isScrolledToBottom(output) {
    return (output.prop('scrollHeight') - output.prop('clientHeight')) <= output.scrollTop() + 30;
  }

  scrollToBottom(output) {
    output.scrollTop(output.prop('scrollHeight'));
  }

  render()  {
    const { lastResult } = this.props;
    return (
      <div className="output" >
        <div />
      </div>
    );
  }
}

export default GameScreen;
