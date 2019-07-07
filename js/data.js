'use strict';
(function () {
  var MIN_LOCATION_Y = 60;
  var MAX_LOCATION_Y = 630;
  var MAX_LOCATION_X = 1200;
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_HALFWIDTH = 25;
  var DEFAULT_OFFER_MESSAGE = 'Заголовок объявления';
  var OffersMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';

  window.data = {
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    MAX_LOCATION_X: MAX_LOCATION_X,
    MAP_PIN_HALFWIDTH: MAP_PIN_HALFWIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    DEFAULT_OFFER_MESSAGE: DEFAULT_OFFER_MESSAGE,
    OffersMinPrice: OffersMinPrice,
    DATA_URL: DATA_URL
  };
})();

