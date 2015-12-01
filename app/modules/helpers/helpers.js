'use strict';

define(function(require){
  return {
    getPosition: function(element){
      let xPosition = 0, yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft + element.clientLeft);
        yPosition += (element.offsetTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };

    },
    iterateNodes: function(nodes, callback, scope){
      for(var i = 0; i < nodes.length; i++){
        callback.call(scope, i, nodes[i]);
      }
    }

  };
});
