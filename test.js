global.requirejs = require('requirejs');
var Mocha = require("mocha");

// create mocha instance and pass options
var mocha = new Mocha({ ui: 'bdd', reporter: 'spec' });

// load assertion frameworks
global.chai = require('chai');

// define window after loading modules
global.window = global;

// this would be the place to load library dependencies, like jQuery

mocha.addFile('./app/models/test/cards');
mocha.addFile('./app/modules/roman-numerals/test/roman-numerals');
mocha.run();