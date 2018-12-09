'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var RANDOM_WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var RANDOM_WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var counter = 0;
var similarListElement = document.querySelector('.setup-similar-list');
var userDialogElement = document.querySelector('.setup');
var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var nameFieldElement = setupElement.querySelector('.setup-user-name');
var wizardCoatElement = setupElement.querySelector('.wizard-coat');
var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
var fireballElement = setupElement.querySelector('.setup-fireball-wrap');
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

nameFieldElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

var onClickElementChange = function (element, array, style, name) {
  counter--;
  if (counter < 0) {
    counter = array.length - 1;
  }
  element.style = style + ': ' + array[counter];
  document.querySelector('input[name=' + name + '-color').value = array[counter];
};

wizardCoatElement.addEventListener('click', function () {
  onClickElementChange(wizardCoatElement, WIZARD_COAT_COLORS, 'fill', 'coat');
});

wizardEyesElement.addEventListener('click', function () {
  onClickElementChange(wizardEyesElement, WIZARD_EYES_COLORS, 'fill', 'eyes');
});

fireballElement.addEventListener('click', function () {
  onClickElementChange(fireballElement, FIREBALL_COLORS, 'background-color', 'fireball');
});

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
      coatColor: getRandomFromArray(RANDOM_WIZARD_COAT_COLORS),
      eyesColor: getRandomFromArray(RANDOM_WIZARD_EYES_COLORS)
    });
  }
  return wizardsList;
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
  var fragment = document.createDocumentFragment();

  showSimilarSetup();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

drawWizards();
