define(function(require){
	var Cards = function(){
		var model = {};

		var init =  function(path, callback){
			var httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = function(){
				if(this.readyState == 4) {
					var data = JSON.parse(httpRequest.responseText);
					if(callback) callback(data);
				}
			};
			httpRequest.open('GET', path);
			httpRequest.send();
		};

		model.addCardsToDOM = function(container){
			var _container = document.querySelector('#'+container);
			model.cards.forEach(function(card){
				if(card.index < 36){
					var img = document.createElement("img");
					img.src = 'images/tarot/'+card.image+'.jpg';
					img.width='100';
					_container.appendChild(img);
				}
			});
		};	
		
		init('models/cards.json', function(data){
			model.cards = data;
			model.addCardsToDOM('cards');
		});

		return model;
	};

	var cards =	Cards();

});