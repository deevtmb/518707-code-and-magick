'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var setupElement = document.querySelector('.setup');

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNumber = Math.floor(minNumber + (Math.random() * (maxNumber - minNumber + 1)));

    return randomNumber;
  };

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccessLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    var randomIndex;

    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      randomIndex = getRandomNumber(0, wizards.length - 1);
      fragment.appendChild(renderWizard(wizards[randomIndex]));
      wizards.splice(randomIndex, 1);
    }
    similarListElement.appendChild(fragment);

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(onSuccessLoad, window.backend.onErrorMessage);
})();
