'use strict'

var mainMap = document.querySelector('.map');
mainMap.classList.remove('map--faded');

var similarOffersList = document.querySelector('.map__pins');
var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var DEFAULT_OFFER_MESSAGE = 'Заголовок объявления'

var OFFERS_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var createOffers = function (usersCount) {
  var similarOffers = [];
  for (var i = 1; i <= usersCount; i++) {
    var similarOffer = {};
    similarOffer.author = {
      avatar: 'img/avatars/user0' + i + '.png'
    };
    similarOffer.offer = {
      type: OFFERS_TYPE[Math.round(Math.random() * (OFFERS_TYPE.length - 1) )]
    };
    similarOffer.location = {
     x: (Math.random() * 1200) - (MAP_PIN_WIDTH / 2),
     y: MIN_LOCATION_Y + (Math.random() * (MAX_LOCATION_Y - MIN_LOCATION_Y)) - MAP_PIN_HEIGHT
    }
    similarOffers.push(similarOffer);
  }
  return similarOffers;
}

var similarOffers = createOffers(8);

var renderOffer = function (similarOffer) {
  var offerElement = similarOfferPinTemplate.cloneNode(true);
  offerElement.style = 'left: ' + similarOffer.location.x + 'px; ' + 'top: ' + similarOffer.location.y + 'px';
  offerElement.querySelector('img').src = similarOffer.author.avatar;
  offerElement.querySelector('img').alt = DEFAULT_OFFER_MESSAGE;
  return offerElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarOffers.length; i++) {
  fragment.appendChild(renderOffer(similarOffers[i]));
}

similarOffersList.appendChild(fragment);

mainMap.classList.remove('map--faded');
