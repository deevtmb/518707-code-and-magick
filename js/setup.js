'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var getRandomName = function (names) {
  var i = Math.floor(Math.random() * names.length);
  var name = names[i];
  names.splice(i, 1);

  return name;
};

var getRandomColor = function (colors) {
  var i = Math.floor(Math.random() * colors.length);
  var randomColor = colors[i];
  colors.splice(i, 1);

  return randomColor;
};

var getWizardName = function (firstNames, lastNames) {
  return getRandomName(firstNames) + ' ' + getRandomName(lastNames);
};

var getRandomWizard = function (amount) {
  var wizardsList = [];
  for (var i = 0; i < amount; i++) {
    wizardsList.push({
      name: getWizardName(WIZARD_FIRSTNAMES, WIZARD_LASTNAMES),
      coatColor: getRandomColor(WIZARD_COAT_COLORS),
      eyesColor: getRandomColor(WIZARD_EYES_COLORS)
    });
  }
  return wizardsList;
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
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var userDialogElement = document.querySelector('.setup');
  var wizards = getRandomWizard(WIZARDS_AMOUNT);

  userDialogElement.classList.remove('hidden');
  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

drawWizards();
