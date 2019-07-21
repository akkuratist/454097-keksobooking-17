'use strict';
(function () {
  var RoomsCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var mainMapPin = document.querySelector('.map__pin--main');
  var offerAddress = adForm.querySelector('#address');

  var housePrice = document.querySelector('#price');
  var houseSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');


  window.util.disableElements(adFormElements);

  var setMinPrice = function () {
    housePrice.min = window.data.OffersMinPrice[houseSelect.value];
    housePrice.placeholder = housePrice.min;
  };
  setMinPrice();

  var syncSelects = function (firstSelect, secondSelect) {
    secondSelect.value = firstSelect.value;
  };

  houseSelect.addEventListener('change', setMinPrice);

  timeInSelect.addEventListener('change', function () {
    syncSelects(timeInSelect, timeOutSelect);
  });

  timeOutSelect.addEventListener('change', function () {
    syncSelects(timeOutSelect, timeInSelect);
  });

  var setCapacity = function () {
    Array.from(guestsSelect.options).forEach(function (option, index) {
      guestsSelect.options[index].setAttribute('disabled', 'true');
      if (RoomsCapacity[roomSelect.value].indexOf(guestsSelect.options[index].value) !== -1) {
        guestsSelect.options[index].removeAttribute('disabled');
      }

    });

    if (guestsSelect.value !== roomSelect.value) {
      syncSelects(roomSelect, guestsSelect);
    }

    if (roomSelect.value === '100') {
      guestsSelect.selectedIndex = 3;
    }

  };

  var activatePage = function () {
    window.util.enableElements(adFormElements);
    window.map.mainMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.map.renderOffers();
    mainMapPin.removeEventListener('click', activatePage);
    offerAddress.setAttribute('readonly', true);
    setCapacity();
  };

  var deactivatePage = function () {
    window.card.closeCard();
    window.util.disableElements(adFormElements);
    window.map.mainMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.clearMap();
    mainMapPin.addEventListener('click', activatePage);
    adForm.reset();
    window.pin.setDefaultAddress();
  };

  var adFormSuccessHandler = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    var onEscPress = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.util.KeyCodes.ESC) {
        successMessage.remove();
        document.removeEventListener('keydown', onEscPress);
        document.removeEventListener('click', onMouseClick);
      }
    };
    var onMouseClick = function (evt) {
      evt.preventDefault();
      successMessage.remove();
      document.removeEventListener('click', onMouseClick);
      document.removeEventListener('keydown', onEscPress);
    };
    document.addEventListener('click', onMouseClick);
    document.addEventListener('keydown', onEscPress);
    document.body.insertBefore(successMessage, document.body.children[0]);
    deactivatePage();
  };


  mainMapPin.addEventListener('click', activatePage);
  roomSelect.addEventListener('change', setCapacity);

  adForm.addEventListener('submit', function (evt) {
    window.load.uploadData(new FormData(adForm), adFormSuccessHandler, window.util.errorHandler);
    evt.preventDefault();
  });

  window.form = {
    adForm: adForm,
    houseSelect: houseSelect,
    adFormElements: adFormElements,
    offerAddress: offerAddress
  };
})();
