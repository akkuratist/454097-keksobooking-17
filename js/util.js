'use strict';
(function () {
  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  };

  var getRandomNumber = function (number) {
    return Math.random() * number;
  };

  var getRandomElement = function (array) {
    return array[Math.round(getRandomNumber(array.length - 1))];
  };

  var disableElements = function (elements) {
    elements.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });
  };

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var errorHandler = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');
    var onEscPress = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === KeyCodes.ESC) {
        errorMessage.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };
    var onMouseClick = function (evt) {
      evt.preventDefault();
      errorMessage.remove();
    };
    document.addEventListener('keydown', onEscPress);
    errorButton.addEventListener('click', onMouseClick);
    document.body.insertBefore(errorMessage, document.body.children[0]);
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    disableElements: disableElements,
    enableElements: enableElements,
    errorHandler: errorHandler,
    KeyCodes: KeyCodes
  };
})();
