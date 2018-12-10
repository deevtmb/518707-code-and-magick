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

})();
