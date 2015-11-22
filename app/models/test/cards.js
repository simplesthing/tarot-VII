var Model = require('./helpers/model');
var model = new Model();


describe('Cards', function(){
	it('should initialize', function(){
      chai.expect(typeof model).to.be.equal('object');
      chai.expect(model.models).to.be.an('Array');
    });

	var elementalCards, planetaryCards, zodiacalCards;
	it('should contain 78 cards', function(){
		chai.expect(model.cards.length).to.be.equal(78);
	});

	describe('Props', function(){
		var majorArcana;
		it('should have an index', function(){
			model.cards.forEach(function(card){
				chai.expect(card.index).to.be.an('Number');
			});
		});
		it('should have an arcana', function(){
			majorArcana = model.cards.filter(function(card){
				chai.expect(card.arcana).to.be.an('String');
				if(card.arcana === 'major') {return true;}
			});
		});
		it('should have 22 Major Arcana cards', function(){
			chai.expect(majorArcana.length).to.be.equal(22);
		});
		it('should have a name', function(){
			model.cards.forEach(function(card){
				chai.expect(card.name).to.be.an('String');
			});
		});
		it('should have an image', function(){
			model.cards.forEach(function(card){
				chai.expect(card.image).to.be.an('String');
			});
		});
		
	});

	describe('Energy', function(){
		it('should have energy_name', function(){
			model.cards.forEach(function(card){
				chai.expect(card.has.energy_name).to.be.an('String');
				chai.expect(card.has.energy_name).to.be.match(/elemental|planetary|zodiacal/);
			});
		});
		describe('Elemental Cards', function(){
			var elementalCards;
			it('should have element_name', function(){
			 elementalCards = model.cards.filter(function(card){
					if(card.has.energy_name === 'elemental') {
						chai.expect(card.has.element_name).to.be.an('String');
						return true;
					}
				});
			});
			it('should have 59 elemental cards', function(){
				chai.expect(elementalCards.length).to.be.equal(59);
			});
			it('should find an matching element in elements model', function(){
				elementalCards.forEach(function(ec){
					chai.expect(model.elements.some(el => el.name === ec.has.element_name)).to.be.true;
				});
			});
		});
		describe('Planetary Cards', function(){
			var planetaryCards;
			it('should have planet_name', function(){
				planetaryCards = model.cards.filter(function(card){
					if(card.has.energy_name === 'planetary'){
						chai.expect(card.has.planet_name).to.be.an('String');
						return true;
					}
				});
			});
			it('should have 7 planetary cards', function(){
				chai.expect(planetaryCards.length).to.be.equal(7);
			});
			it('should find matching planet in planets model', function(){
				planetaryCards.forEach(function(pc){
					chai.expect(model.planets.some(el => el.name === pc.has.planet_name)).to.be.true;
				});
			});
		});
		describe('Zodiac Cards', function(){
			var zodiacCards;
			it('should have zodiac_name', function(){
				zodiacCards = model.cards.filter(function(card){
					if(card.has.energy_name === 'zodiacal'){
						chai.expect(card.has.zodiac_name).to.be.an('String');
						return true;
					}
				});
			});
			it('should have 12 zodiacal cards', function(){
				chai.expect(zodiacCards.length).to.be.equal(12);
			});
			it('should find matching zodiac sign in zodiac model', function(){
				zodiacCards.forEach(function(zc){
					chai.expect(model.zodiac.some(el => el.name === zc.has.zodiac_name));
				});
			});
		});
	});

	describe('Color', function(){
		it('should have a color_name', function(){
			model.cards.forEach(function(card){
				chai.expect	(card.has.color_name).to.be.an('String');
			});
		});
		it('should find matching colors in color model', function(){
			model.cards.forEach(function(card){
				chai.expect(model.colors.some(el => el.name === card.has.color_name)).to.be.true;
			});
		});
	});
	
});