'use strict';
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MAX_LOCATION_X = 1200;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var DEFAULT_OFFER_MESSAGE = 'Заголовок объявления';
var OFFERS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var offersCount = 8;

var mainMap = document.querySelector('.map');
mainMap.classList.remove('map--faded');

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
      type: getRandomElement(OFFERS_TYPE)
    };
    similarOffer.location = {
      x: (getRandomNumber(MAX_LOCATION_X)) - (MAP_PIN_WIDTH / 2),
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
  var similarOffers = createOffers(offersCount);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarOffers.length; i++) {
    fragment.appendChild(renderOffer(similarOffers[i]));
  }
  similarOffersList.appendChild(fragment);

  mainMap.classList.remove('map--faded');
};

renderOffers();
