'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var mainMapPin = document.querySelector('.map__pin--main');
  var offerAddress = adForm.querySelector('input[name="address"]');

  var roomPrice = document.querySelector('#price');
  var roomSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  window.util.disableElements(adFormElements);

  var setMinPrice = function () {
    roomPrice.min = window.data.OFFERS_MIN_PRICES[roomSelect.value];
    roomPrice.placeholder = roomPrice.min;
  };

  setMinPrice();

  var syncSelects = function (firstSelect, secondSelect) {
    secondSelect.value = firstSelect.value;
  };

  roomSelect.addEventListener('change', setMinPrice);

  timeInSelect.addEventListener('change', function () {
    syncSelects(timeInSelect, timeOutSelect);
  });

  timeOutSelect.addEventListener('change', function () {
    syncSelects(timeOutSelect, timeInSelect);
  });


  var activatePage = function () {
    window.util.enableElements(adFormElements);
    adForm.classList.remove('ad-form--disabled');
    window.map.renderOffers();
    mainMapPin.removeEventListener('click', activatePage);
    offerAddress.setAttribute('readonly', true);
  };

  mainMapPin.addEventListener('click', activatePage);


  window.form = {
    adForm: adForm,
    roomSelect: roomSelect,
    adFormElements: adFormElements,
    offerAddress: offerAddress

  };
})();
