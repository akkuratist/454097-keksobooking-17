'use strict';
(function () {
  var DEFAULT_OFFER_MESSAGE = 'Заголовок объявления';
  var OffersMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var OffersType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  window.data = {
    DEFAULT_OFFER_MESSAGE: DEFAULT_OFFER_MESSAGE,
    OffersMinPrice: OffersMinPrice,
    OffersType: OffersType,
  };
})();

