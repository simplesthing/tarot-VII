var Model = require('./helpers/model');
var model = new Model();

describe('Testing Model', function(done){
    it('initializes a model', function(){
      chai.expect(typeof model).to.be.equal('object');
      chai.expect(model.models).to.be.an('Array');
    });
    model.models.forEach(function(m,i){
 		model[m] = model.getModel('./app/models/'+m+'.json');
 	});
});
