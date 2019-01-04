'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupElement = document.querySelector('.setup');
  var wizardCoatElement = setupElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var fireballElement = setupElement.querySelector('.setup-fireball-wrap');
  var counter = 0;
  var coatColor;
  var eyesColor;
  var similarWizards = [];

  var onClickElementChange = function (element, array, style, name) {
    counter--;
    if (counter < 0) {
      counter = array.length - 1;
    }
    element.style = style + ': ' + array[counter];
    document.querySelector('input[name=' + name + '-color').value = array[counter];

    return array[counter];
  };

  var updateWizards = function () {
    var sameCoatAndEyesWizards = similarWizards.filter(function (it) {
      return similarWizards.colorCoat === coatColor &&
        it.colorEyes === eyesColor;
    });

    var sameCoatWizards = similarWizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });

    var sameEyesWizards = similarWizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(similarWizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.renderSimilarWizards(uniqueWizards);
  };

  wizardCoatElement.addEventListener('click', function () {
    coatColor = onClickElementChange(wizardCoatElement, WIZARD_COAT_COLORS, 'fill', 'coat');
    updateWizards();
  });

  wizardEyesElement.addEventListener('click', function () {
    eyesColor = onClickElementChange(wizardEyesElement, WIZARD_EYES_COLORS, 'fill', 'eyes');
    updateWizards();
  });

  fireballElement.addEventListener('click', function () {
    onClickElementChange(fireballElement, FIREBALL_COLORS, 'background-color', 'fireball');
  });

  var onSuccessLoad = function (wizards) {
    similarWizards = wizards;
    updateWizards();
  };

  window.backend.load(onSuccessLoad, window.backend.onErrorMessage);
})();
