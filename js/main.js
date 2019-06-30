'use strict';
var MIN_LOCATION_Y = 60;
var MAX_LOCATION_Y = 630;
var MAX_LOCATION_X = 1200;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_HALFWIDTH = 25;
var DEFAULT_OFFER_MESSAGE = 'Заголовок объявления';
var OFFERS_MIN_PRICES = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var OFFERS_COUNT = 8;

var mainMap = document.querySelector('.map');
var similarOffersList = document.querySelector('.map__pins');
var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var getRandomNumber = function (number) {
  return Math.random() * number;
};

var getRandomElement = function (array) {
  return array[Math.round(getRandomNumber(array.length - 1))];
};

var createOffers = function (usersCount) {
  var similarOffers = [];
  for (var i = 1; i <= usersCount; i++) {
    var similarOffer = {};
    similarOffer.author = {
      avatar: 'img/avatars/user0' + i + '.png'
    };
    similarOffer.offer = {
      type: getRandomElement(roomSelect.options)
    };
    similarOffer.location = {
      x: (getRandomNumber(MAX_LOCATION_X)) - (MAP_PIN_HALFWIDTH),
      y: MIN_LOCATION_Y + (getRandomNumber(MAX_LOCATION_Y - MIN_LOCATION_Y)) - MAP_PIN_HEIGHT
    };
    similarOffers.push(similarOffer);
  }
  return similarOffers;
};

var renderOffer = function (similarOffer) {
  var offerElement = similarOfferPinTemplate.cloneNode(true);
  var offerElementImage = offerElement.querySelector('img');
  offerElement.style = 'left: ' + similarOffer.location.x + 'px; ' + 'top: ' + similarOffer.location.y + 'px';
  offerElementImage.src = similarOffer.author.avatar;
  offerElementImage.alt = DEFAULT_OFFER_MESSAGE;
  return offerElement;
};

var renderOffers = function () {
  var similarOffers = createOffers(OFFERS_COUNT);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarOffers.length; i++) {
    fragment.appendChild(renderOffer(similarOffers[i]));
  }
  similarOffersList.appendChild(fragment);

  mainMap.classList.remove('map--faded');
};


// Подробности (module4-task1)

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mainMapPin = document.querySelector('.map__pin--main');
var offerAddress = adForm.querySelector('input[name="address"]');


var setAddress = function () {
  var offerAddressX = parseInt(mainMapPin.style.left, 10) + (MAP_PIN_HALFWIDTH);
  var offerAddressY = parseInt(mainMapPin.style.top, 10) + MAP_PIN_HEIGHT;
  offerAddress.value = offerAddressX + ', ' + offerAddressY;
};

var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'true');
  }
};

disableElements(adFormElements);

var enableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var activatePage = function () {
  enableElements(adFormElements);
  adForm.classList.remove('ad-form--disabled');
  renderOffers();
  mainMapPin.removeEventListener('click', activatePage);
  offerAddress.setAttribute('readonly', true);
};

mainMapPin.addEventListener('click', activatePage);


// Доверяй, но проверяй (module4-task2)

var roomPrice = document.querySelector('#price');
var roomSelect = document.querySelector('#type');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');


var setMinPrice = function () {
  roomPrice.min = OFFERS_MIN_PRICES[roomSelect.value];
  roomPrice.placeholder = roomPrice.min;
};

setMinPrice();

roomSelect.addEventListener('change', setMinPrice);


var syncSelects = function (firstSelect, secondSelect) {
  secondSelect.value = firstSelect.value;
};

timeInSelect.addEventListener('change', function () {
  syncSelects(timeInSelect, timeOutSelect);
});

timeOutSelect.addEventListener('change', function () {
  syncSelects(timeOutSelect, timeInSelect);
});


// module5-task1

mainMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var left = moveEvt.clientX - mainMap.offsetLeft - MAP_PIN_HALFWIDTH;
    var top = moveEvt.clientY - mainMap.offsetTop - MAP_PIN_HEIGHT;
    mainMapPin.style.left = Math.min(mainMap.offsetWidth - MAP_PIN_HALFWIDTH, Math.max(-MAP_PIN_HALFWIDTH, left)) + 'px';
    mainMapPin.style.top = Math.min(MAX_LOCATION_Y, Math.max(MIN_LOCATION_Y, top)) + 'px';
    setAddress();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

