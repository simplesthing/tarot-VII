'use strict';

define(function (require) {
  var helper = require('../../modules/helpers/helpers');
  var _cards = require('./cards');

  var Shuffle = function Shuffle() {
    var model = {},
        deck = document.querySelector('.deck'),
        cuts = 0;

    function stackCut(top, bottom) {
      var marginLeft = window.innerWidth / 78 / 2;
      top.forEach(function (card) {
        card.style.left = '0%';
        card.style.marginLeft = Math.round(marginLeft) + '%';
      });
      bottom.forEach(function (card) {
        card.style.left = '0%';
        card.style.marginLeft = Math.round(marginLeft) + '%';
      });
      if (cuts < 3) {
        setTimeout(shuffleCards, 500, 3);
      } else {
        // TODO Deal cards
      }
    }

    function cutCardData(index) {
      var bottom = _cards.data.slice(0, index),
          top = _cards.data.slice(index, _cards.data.length).reverse();
      _cards.data = top.concat(bottom);
    }

    function cutCards(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      cuts++;
      // console.log(evt.target.dataset.index);
      var cards = document.querySelectorAll('.card'),
          cut = evt.target.dataset.index,
          topStack = helper.getPosition(cards[cards.length - 10]),
          bottomStack = helper.getPosition(cards[10]),
          bottom = [],
          top = [];
      console.log(_cards.data[cut]);
      // cut cards into top and bottom stacks
      helper.iterateNodes(cards, function (index, value) {
        if (index < cut) {
          // move cards to the left of the clicked card
          value.style.top = bottomStack.y + 'px';
          value.style.left = bottomStack.x + 'px';
          bottom.push(value);
        } else {
          // move cards to the right of clicked card
          value.style.top = topStack.y + 'px';
          value.style.left = topStack.x + 'px';
          top.push(value);
        }
      });
      // cut _cards.data
      cutCardData(cut);
      updateInstructions();
      setTimeout(stackCut, 500, top, bottom);
    }

    function lineUpCards(index, value) {
      var marginLeft = window.innerWidth / 78 / 2;
      value.style.top = '20%';
      value.style.left = index * 1 + '%';
      value.style.transform = 'rotate(0deg)';
      value.style.marginLeft = Math.round(marginLeft) + '%';
    }

    function setupCut(cards) {
      helper.iterateNodes(cards, function (index, value) {
        var transform = value.style.transform,
            start = transform.indexOf('('),
            end = transform.indexOf('d'),
            rotation = transform.substring(start + 1, end),
            reverse = rotation > 180 ? true : false;
        lineUpCards(index, value);

        if (reverse) {
          if (value.classList.contains('reverse')) {
            value.classList.remove('reverse');
          } else {
            value.classList.add('reverse');
          }
        }

        value.addEventListener('click', cutCards, false);
      });
    }

    function randomPosition() {
      return Math.floor(Math.random() * 80);
    }

    function rotation() {
      return Math.floor(Math.random() * 360);
    }

    // Fisher-Yates shuffle - http://bost.ocks.org/mike/shuffle/
    function shuffleCardData() {
      var numCards = _cards.data.length,
          pick = undefined,
          swap = undefined;
      while (numCards) {
        pick = Math.floor(Math.random() * numCards--);
        swap = _cards.data[numCards];
        _cards.data[numCards] = _cards.data[pick];
        _cards.data[pick] = swap;
      }
    }

    function shuffleCards(n) {
      var cards = document.querySelectorAll('.card');
      if (n === 0) {
        setupCut(cards);
        return;
      }
      // shuffle cards in DOM
      helper.iterateNodes(cards, function (index, value) {
        value.style.left = randomPosition() + '%';
        value.style.top = randomPosition() + 12 + '%';
        value.style.transform = 'rotate(' + rotation() + 'deg)';
      });
      // shuffle _cards.data
      shuffleCardData();
      setTimeout(shuffleCards, 600, n - 1);
    }

    function updateInstructions() {
      var instructions = document.querySelector('.instructions'),
          remainingCuts = 3 - cuts,
          times = remainingCuts > 1 ? 'times' : 'more time';

      if (cuts < 3) {
        instructions.innerHTML = 'You must cut the cards ' + remainingCuts + ' ' + times + '. <br> Click the cards where you want the deck to be cut.';
      } else {
        instructions.remove();
      }
    }

    function startShuffle(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var page = document.querySelector('.page'),
          numCards = _cards.data.length,
          instructions = document.createElement('h1'),
          cards = undefined;
      // clear page container
      while (page.firstChild) {
        page.removeChild(page.firstChild);
      }
      // reclass page container for shuffle layout
      page.classList.remove('home');
      page.classList.add('shuffle');
      // add instructions to cut deck
      instructions.classList.add('instructions');
      page.appendChild(instructions);
      updateInstructions();
      // add cards to DOM
      for (var i = 0; i < numCards; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = i;
        page.appendChild(card);
        card.style.transition = 'all 0.5s ease';
      }
      // line cards up
      cards = document.querySelectorAll('.card');
      helper.iterateNodes(cards, function (index, value) {
        lineUpCards(0, value);
      });
      // shuffle 3 times
      setTimeout(shuffleCards, 200, 3);
    }
    // click deck to start
    deck.addEventListener('click', startShuffle, false);

    return model;
  };

  return new Shuffle();
});