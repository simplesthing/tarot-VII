'use strict';

define(function(require){
  return {
    // http://www.kirupa.com/html5/get_element_position_using_javascript.htm
    getPosition: function(element){
      let xPosition = 0, yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };

    }
  };
});
