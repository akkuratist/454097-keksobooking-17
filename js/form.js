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
  var offerAddress = adForm.querySelector('#address');

  var housePrice = document.querySelector('#price');
  var houseSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var disableFormElements = function () {
    window.util.disableElements(adFormElements);
    window.util.disableElements(window.map.filterElements.selects);
    window.util.disableElements(window.map.filterElements.features);
  };

  var enableFormElements = function () {
    window.util.enableElements(adFormElements);
    window.util.enableElements(window.map.filterElements.selects);
    window.util.enableElements(window.map.filterElements.features);
  };

  disableFormElements();

  var onHouseSelectChange = function () {
    housePrice.min = window.data.OffersMinPrice[houseSelect.value];
    housePrice.placeholder = housePrice.min;
  };
  onHouseSelectChange();

  var syncSelects = function (firstSelect, secondSelect) {
    secondSelect.value = firstSelect.value;
  };

  houseSelect.addEventListener('change', onHouseSelectChange);

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
      guestsSelect.value = RoomsCapacity[roomSelect.value];
    }

  };

  var activatePage = function () {
    enableFormElements();
    window.map.main.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.map.renderOffers(window.map.getFilteredOffers());
    window.map.mainPin.removeEventListener('click', onMainPinClick);
    offerAddress.setAttribute('readonly', true);
    setCapacity();
  };

  var deactivatePage = function () {
    window.card.close();
    window.photos.setDefaultAvatar();
    window.photos.clear();
    disableFormElements();
    window.map.main.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.clearMap();
    window.map.clearFilters();
    window.map.mainPin.addEventListener('click', onMainPinClick);
    adForm.reset();
    window.pin.setDefaultAddress();
  };

  var onMainPinClick = function () {
    activatePage();
  };

  var onEscPress = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.KeyCodes.ESC) {
      closeSuccessMessage();
    }
  };
  var onMouseClick = function (evt) {
    evt.preventDefault();
    closeSuccessMessage();
  };

  var showSuccessMessage = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    successMessage.addEventListener('click', onMouseClick);
    document.addEventListener('keydown', onEscPress);
    document.body.insertBefore(successMessage, document.body.children[0]);
    deactivatePage();
  };

  var closeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onMouseClick);
    }
  };


  window.map.mainPin.addEventListener('click', onMainPinClick);
  roomSelect.addEventListener('change', function () {
    setCapacity();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.load(window.backend.Url.FORM_URL, showSuccessMessage, window.util.onError, window.backend.Methods.POST, new FormData(adForm));
    evt.preventDefault();
  });

  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

  window.form = {
    adForm: adForm,
    adFormElements: adFormElements,
    offerAddress: offerAddress
  };
})();
