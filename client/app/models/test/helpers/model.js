var fs = require('fs');

var Model = function(){
	var model = {};
	model.models = ['cards','celtic-cross-positions','colors','elements','energy','numbers','planets','zodiac'];
	model.models.map(function(m){
 		fs.readFile('./app/models/'+m+'.json', 'utf-8', function(err,data){
 			if(err) {
 				throw err;
 			}
 			model[m] = JSON.parse(data);
 		});
 	});
	return model;
};


module.exports = Model;