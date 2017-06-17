/**
 * main.js
 *
 * The client-side entry point.
 *
 */

var AppView = require('./views/appView');
var appView = new AppView();

import GameMode from  './react/components/gameMode/index';
var ReactDOM = require('react-dom');
var React = require('react');
console.dir(GameMode);
ReactDOM.render(React.createElement(GameMode, null), document.getElementById('contents'));

