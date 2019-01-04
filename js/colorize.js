'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var DEBOUNCE_INTERVAL = 500;

  var setupElement = document.querySelector('.setup');
  var wizardCoatElement = setupElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var fireballElement = setupElement.querySelector('.setup-fireball-wrap');
  var counter = 0;
  var coatColor;
  var eyesColor;
  var fireballColor;
  var similarWizards = [];
  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var onClickElementChange = function (element, array, style, name) {
    counter--;
    if (counter < 0) {
      counter = array.length - 1;
    }
    element.style = style + ': ' + array[counter];
    document.querySelector('input[name=' + name + '-color').value = array[counter];

    return array[counter];
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 4;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 2;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.renderSimilarWizards(similarWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onSuccessLoad = function (wizards) {
    similarWizards = wizards;
    updateWizards();
  };

  wizardCoatElement.addEventListener('click', function () {
    coatColor = onClickElementChange(wizardCoatElement, WIZARD_COAT_COLORS, 'fill', 'coat');
    debounce(updateWizards);
  });

  wizardEyesElement.addEventListener('click', function () {
    eyesColor = onClickElementChange(wizardEyesElement, WIZARD_EYES_COLORS, 'fill', 'eyes');
    debounce(updateWizards);
  });

  fireballElement.addEventListener('click', function () {
    fireballColor = onClickElementChange(fireballElement, FIREBALL_COLORS, 'background-color', 'fireball');
    debounce(updateWizards);
  });

  window.backend.load(onSuccessLoad, window.backend.onErrorMessage);
})();
