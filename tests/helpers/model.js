var fs = require('fs');

var Model = function(){
	var models = ['cards','celtic-cross-positions','colors','elements','energy','numbers','planets','zodiac'];
	return {
		models:models,
		getModel: function(name){
			return JSON.parse(fs.readFileSync(name, 'utf-8'));
		},

	};
};


module.exports = Model;