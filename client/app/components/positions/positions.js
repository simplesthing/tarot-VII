/**
 * Created by avacollins on 12/22/15.
 */
'use strict';

define(function(require){
  var Positions = function(){
    var model = {};

    var init =  function(path, callback){
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function(){
        if(this.readyState === 4) {
          var data = JSON.parse(httpRequest.responseText);
          if(callback) { callback(data); }
        }
      };
      httpRequest.open('GET', path);
      httpRequest.send();
    };

    init('http://localhost:3000/api/positions', function(data){
      model.data = data;
    });

    model.getReading = function(position, card){
      var promise = new Promise(function(resolve, reject){
        init('http://localhost:3000/api/readings/' + position + '/' + card, function(data){
          if(data.reading) {
            resolve(data.reading);
          } else {
            reject(data);
          }
        });
      });
      return promise;
    };

    return model;

  };

  return new Positions();
});
