'use strict';

define(function(require){
  var helper = require('../../modules/helpers/helpers');
  var Shuffle = function(){
    let model = {};
    let deck = document.querySelector('.deck');

    deck.addEventListener('click', function(evt){
      evt.preventDefault();
      evt.stopPropagation();
      startShuffle();
    });

    function setupCut(cards){
      helper.iterateNodes(cards, function(index, value){
        let transform = value.style.transform,
            start = transform.indexOf('('),
            end = transform.indexOf('d'),
            rotation = transform.substring(start + 1, end),
            reverse = rotation > 180 ? true : false;
        value.style.top = '10%';
        value.style.left = index *1 + '%';
        value.style.marginLeft = '3%';
        value.style.transform = 'rotate(0deg)';
        if(reverse){
          value.classList.add('reverse');
        }
      });
    }

    var randomPosition = function(){
      return Math.floor(Math.random() * 90);
    };

    var rotation = function(){
      return Math.floor(Math.random() * 360);
    };

    function shuffleCards(n){
      var cards = document.querySelectorAll('.card');
      if(n === 0){
        // setup cut
        setupCut(cards);
        return;
      }
      helper.iterateNodes(cards, function(index, value){
        value.style.display = 'block';
        value.style.left = randomPosition() + '%';
        value.style.top = randomPosition() + '%';
        value.style.transform = 'rotate('+rotation()+'deg)';
      });
      setTimeout(shuffleCards, 1100, n-1);
    }

    function startShuffle(){
      var page = document.querySelector('.page'),
          numCards = 78;
      // clear page container
      while(page.firstChild) {
        page.removeChild(page.firstChild);
      }
      // reclass page container for shuffle layout
      page.classList.remove('home');
      page.classList.add('shuffle');
      // add cards to DOM
      for(var i = 0; i < numCards; i++){
        var card = document.createElement('div');
        card.classList.add('card');
        card.style.display = 'none';
        page.appendChild(card);
        card.style.transition = 'all 1.0s ease';
      }
      // shuffle 3 times
      shuffleCards(3);
    }
    return model;
  };

  return new Shuffle();

});
