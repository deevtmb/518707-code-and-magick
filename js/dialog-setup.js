'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var nameFieldElement = setupElement.querySelector('.setup-user-name');
  var formElement = setupElement.querySelector('.setup-wizard-form');
  var popupPositionLeft = setupElement.style.left;
  var popupPositionTop = setupElement.style.top;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    setupElement.style.left = popupPositionLeft;
    setupElement.style.top = popupPositionTop;
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var removeError = function () {
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  };

  var onSuccessSubmit = function () {
    closePopup();
    removeError();
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  nameFieldElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  nameFieldElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), onSuccessSubmit, window.backend.onErrorMessage);
    evt.preventDefault();
  });
})();
