'use strict';

var R = require('ramda');

function RomanNumerals(){
	var model = this;

	model.convertArgsToArray = function(args){
		return args.toString().split('').reverse();
	};

	model.checkOnes = function(arg){
		if(arg.length > 0) {
			var map = {
				'1':'I',
				'2':'II',
				'3':'III',
				'4':'IV',
				'5':'V',
				'6':'VI',
				'7':'VII',
				'8':'VIII',
				'9':'IX'
			};

			arg[0] = map[arg[0]];
		}
		return arg;
	};
	model.checkTens = function(arg){
		if(arg.length > 1) {
			var map = {
				'1':'X',
				'2':'XX',
				'3':'XXX',
				'4':'XL',
				'5':'L',
				'6':'LX',
				'7':'LXX',
				'8':'LXXX',
				'9':'XC'
			};
			arg[1] = map[arg[1]];
		}
		return arg;
	};

	model.checkHundreds = function(arg){
		if(arg.length > 2) {
			var map = {
				'1':'C',
				'2':'CC',
				'3':'CCC',
				'4':'CD',
				'5':'D',
				'6':'DC',
				'7':'DCC',
				'8':'DCCC',
				'9':'CM'
			};
			arg[2] = map[arg[2]];
		}
		return arg;
	};

	model.checkThousands = function(arg){
		if(arg.length > 3) {
			var map = {
				'1':'M',
				'2':'MM',
				'3':'MMM',
				'4':'MMMM',
				'5':'MMMMM',
				'6':'MMMMMM',
				'7':'MMMMMMM',
				'8':'MMMMMMMM',
				'9':'MMMMMMMMM'
			};
			arg[3] = map[arg[3]];
		}
		return arg;
	};

	model.composition = R.compose(
							model.checkThousands,
							model.checkHundreds,
							model.checkTens,
							model.checkOnes,
							model.convertArgsToArray);

	model.integerToRomanNumeral = function(arg){
		if(arg === 0 ) {return 0;}
		return model.composition(arg).reverse().join('');
	};

	return model;
}

module.exports = RomanNumerals;
