'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var randomWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(Object());
    wizards[i].name = nameRandomize(WIZARD_FIRSTNAMES, WIZARD_LASTNAMES);
    wizards[i].coatColor = colorRandomize(WIZARD_COAT_COLORS);
    wizards[i].eyesColor = colorRandomize(WIZARD_EYES_COLORS);
  }
  return wizards;
};

var wizards = randomWizards(4);

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  similarListElement.appendChild(wizardElement);
}
