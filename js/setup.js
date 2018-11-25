'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var similarListElement = document.querySelector('.setup-similar-list');
var userDialogElement = document.querySelector('.setup');
var fragment = document.createDocumentFragment();

var getRandomFromArray = function (array) {
  var i = Math.floor(Math.random() * array.length);
  var randomValue = array[i];
  array.splice(i, 1);

  return randomValue;
};

var getWizardName = function (firstNames, lastNames) {
  return getRandomFromArray(firstNames) + ' ' + getRandomFromArray(lastNames);
};

var getRandomWizard = function (amount) {
  var wizardsList = [];
  for (var i = 0; i < amount; i++) {
    wizardsList.push({
      name: getWizardName(WIZARD_FIRSTNAMES, WIZARD_LASTNAMES),
      coatColor: getRandomFromArray(WIZARD_COAT_COLORS),
      eyesColor: getRandomFromArray(WIZARD_EYES_COLORS)
    });
  }
  return wizardsList;
};

var showUserDialog = function () {
  userDialogElement.classList.remove('hidden');
};

var showSimilarSetup = function () {
  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var drawWizards = function () {
  var wizards = getRandomWizard(WIZARDS_AMOUNT);

  showSimilarSetup();
  showUserDialog();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

drawWizards();
