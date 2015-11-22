var RN = require('../roman-numerals');
var rn = new RN();

describe('Roman Numerals', function(){
	it('should initialize', function(){
		chai.expect(typeof rn).to.be.equal('object');
	});
	it('should return 0 for 0', function(){
		chai.expect(rn.integerToRomanNumeral(0)).to.be.equal(0);
	});
	it('should return X for 10', function(){
		chai.expect(rn.integerToRomanNumeral(10)).to.be.equal('X');
	});
	it('should return CCXXI for 221', function(){
		chai.expect(rn.integerToRomanNumeral(221)).to.be.equal('CCXXI');
	});
});
