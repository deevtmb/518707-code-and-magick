'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var nameRandomize = function (firstNames, lastNames) {
  var i = Math.floor(Math.random() * firstNames.length);
  var firstName = firstNames[i];
  firstNames.splice(i, 1);

  var j = Math.floor(Math.random() * lastNames.length);
  var lastName = lastNames[j];
  lastNames.splice(j, 1);

  return firstName + ' ' + lastName;
};

var colorRandomize = function (colors) {
  var i = Math.floor(Math.random() * colors.length);
  var randomColor = colors[i];
  colors.splice(i, 1);

  return randomColor;
};

var wizardsRandomize = function (count) {
  var wizardsList = [];
  for (var i = 0; i < count; i++) {
    wizardsList.push(Object());
    wizardsList[i].name = nameRandomize(WIZARD_FIRSTNAMES, WIZARD_LASTNAMES);
    wizardsList[i].coatColor = colorRandomize(WIZARD_COAT_COLORS);
    wizardsList[i].eyesColor = colorRandomize(WIZARD_EYES_COLORS);
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
  var wizards = wizardsRandomize(4);

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

drawWizards();

userDialog.querySelector('.setup-similar').classList.remove('hidden');
