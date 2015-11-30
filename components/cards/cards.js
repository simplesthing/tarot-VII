'use strict';

define(function (require) {
	var popup = require('../modules/popup/popup');

	var Cards = function Cards() {
		var model = {};

		var init = function init(path, callback) {
			var httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = function () {
				if (this.readyState === 4) {
					var data = JSON.parse(httpRequest.responseText);
					if (callback) {
						callback(data);
					}
				}
			};
			httpRequest.open('GET', path);
			httpRequest.send();
		};

		model.handleCardClick = function (evt) {
			evt.preventDefault();
			evt.stopPropagation();
			popup.addPU(evt.target.id);
		};

		model.addCardsToDOM = function (container) {
			var _container, arcana, suit;
			_container = document.querySelector('#' + container);

			model.cards.forEach(function (card, i) {
				if (card.arcana !== arcana) {
					var h1 = document.createElement('h1');
					arcana = card.arcana;
					h1.innerHTML = card.arcana;
					_container.appendChild(h1);
				}
				if (card.suit && card.suit !== suit) {
					var h2;
					suit = card.suit;
					h2 = document.createElement('h2');
					h2.innerHTML = card.suit;
					_container.appendChild(h2);
				}
				var img = document.createElement('img');
				img.setAttribute('id', i);
				img.setAttribute('alt', card.name);
				img.src = 'images/tarot/' + card.suit + '/' + card.number + '.jpg';
				img.width = '100';
				img.addEventListener('click', model.handleCardClick, false);
				_container.appendChild(img);
			});
		};

		init('models/cards.json', function (data) {
			model.cards = data;
			model.addCardsToDOM('cards');
		});

		return model;
	};

	var cards = new Cards(); //jshint ignore:line
});