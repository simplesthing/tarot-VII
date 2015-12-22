'use strict';

define(function(require){
  return {
    /*
      Get and return the passed in DOM node
      X and Y coordinates on the page
     */
    getPosition: function(element){
      let xPosition = 0, yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft + element.clientLeft);
        yPosition += (element.offsetTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
    },
    /*
      Iterate a list of DOM nodes from
      .queryAll() selector
     */
    iterateNodes: function(nodes, callback, scope){
      for(var i = 0; i < nodes.length; i++){
        callback.call(scope, i, nodes[i]);
      }
    },
    /*
      Initiates a CSS transition for opacity, then removes event
      element = DOM node with the class opacity--zero applied
     */
    opacityZeroToHundred: function (element) {
      element.style.transition = 'opacity 1.5s ease-in';
      element.classList.remove('opacity--zero');
      element.classList.add('opacity--hundred');
      setTimeout(function(){
        element.style.removeProperty('transition');
      }, 2200);
    }
  };
});
