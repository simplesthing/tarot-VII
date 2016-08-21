'use strict';

define(function(require){
  function Details(data){
    let model = {};
    model.container = document.createElement('div');
    model.container.classList.add('detail');
    model.container.style.position = 'absolute';
    model.container.style.zIndex = '10';

    model.close = document.createElement('a');
    model.close.classList.add('detail-close');
    model.close.innerHTML = 'X';

    model.card = document.createElement('img');


    model.container.appendChild(model.close);

    return model;
  }

  function destroyModal(){
    document.body.removeChild(this.modal.container);
    delete this.modal;
  }

  return {
    addDetail: function(data){
      this.modal = new Details(data);
      this.modal.close.addEventListener('click', this.closeModal.bind(this, false));
      document.body.appendChild(this.modal.container);
    },
    closeModal: function(){
      destroyModal.call(this);
    }
  }
});
