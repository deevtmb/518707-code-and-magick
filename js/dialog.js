'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandlerElement = setupDialogElement.querySelector('.upload');
  var dragged = false;
  var startCoords = {};

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandlerElement.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandlerElement.addEventListener('click', onClickPreventDefault);
    }
    dragged = false;
  };

  dialogHandlerElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
