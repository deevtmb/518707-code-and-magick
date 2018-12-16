'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var SUCCESS_STATUS = 200;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  var onErrorMessage = function (errorMessage) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.style = 'position: absolute; z-index: 100; margin: 0 auto; width: 50%; height: 40px; left: 0; right: 0; top: 0; font-size: 24px; color: #fff; text-align: center; line-height: 40px; border-radius: 10px';
    errorMessageElement.style.background = 'linear-gradient(#ee4830 70%, #ffffff)';

    errorMessageElement.textContent = errorMessage;
    document.body.appendChild(errorMessageElement);
  };


  window.backend = {
    load: load,
    save: save,
    onErrorMessage: onErrorMessage
  };
})();
