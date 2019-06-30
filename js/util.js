'use strict';
(function () {
  var getRandomNumber = function (number) {
    return Math.random() * number;
  };

  var getRandomElement = function (array) {
    return array[Math.round(getRandomNumber(array.length - 1))];
  };

  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'true');
    }
  };

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    disableElements: disableElements,
    enableElements: enableElements,
  };
})();
