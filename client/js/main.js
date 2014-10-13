/**
 * main.js
 *
 * The client-side entry point.
 *
 */

require.config({
    paths: {
        'jquery': '../bower-components/jquery/dist/jquery'
        , 'blast': '../bower-components/blast-text/jquery.blast.min'
        , 'underscore': '../bower-components/underscore/underscore'
        , 'backbone': '../bower-components/backbone/backbone'
        , 'fsm': '../bower-components/javascript-state-machine/state-machine.min'

        , 'doTCompiler': '../bower-components/doT/doT'
        , 'text': '../bower-components/requirejs-text/text'
        , 'doT': '../bower-components/requirejs-doT/doT'
    }

    , shim: {
        'blast': {
            deps: ['jquery']
        }
    }
});


require(['views/appView'], function(AppView) {

    var appView = new AppView();
})
