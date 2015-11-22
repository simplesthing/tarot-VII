var Model = require('./tests/helpers/model');

describe('Testing Model', function(done){
  describe('Model', function(){
    it('initializes a model', function(){
      var model = new Model('cards');
      chai.expect(typeof model).to.be.equal('object');
    });
  });
});
