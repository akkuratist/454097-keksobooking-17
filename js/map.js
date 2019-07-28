'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var mainMap = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');
  var pins = similarOffersList.querySelectorAll('.map__pin:not(.map__pin--main)');

  var offers = [];
  var clearMap = function () {
    window.card.closeCard();
    var offerPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    offerPins.forEach(function (offerPin) {
      offerPin.remove();
    });
  };

  var renderOffer = function (similarOffer) {
    var offerElement = similarOfferPinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');
    offerElement.style = 'left: ' + similarOffer.location.x + 'px; ' + 'top: ' + similarOffer.location.y + 'px';
    offerElementImage.src = similarOffer.author.avatar;
    offerElementImage.alt = similarOffer.offer.description;
    offerElement.addEventListener('click', function () {
      window.card.showCard(similarOffer);
      offerElement.classList.add('map__pin--active');
    });
    return offerElement;
  };

  var renderOffers = function (offersList) {
    var fragment = document.createDocumentFragment();
    offersList.forEach(function (offer) {
      fragment.appendChild(renderOffer(offer));
    });
    similarOffersList.appendChild(fragment);
  };

  var getFilteredOffers = function () {
    var filteredOffers = offers.filter(function (offer) {
      return window.filters.filterOffers(offer);
    });
    return filteredOffers.slice(0, 5);
  };

  var updateOffers = function () {
    clearMap();
    renderOffers(getFilteredOffers());
  };


  filters.addEventListener('change', function (evt) {
    if (evt.target.name !== 'features') {
      window.filters.filtersMap[evt.target.name](evt.target.value);
    }

    window.debounce(updateOffers);

  });


  var successHandler = function (data) {
    offers = data;
    return offers;
  };

  window.load.load(window.load.Url.DATA_URL, successHandler, window.util.errorHandler, window.load.Methods.GET);

  window.map = {
    mainMap: mainMap,
    pins: pins,
    mainMapPin: mainMapPin,
    getFilteredOffers: getFilteredOffers,
    renderOffers: renderOffers,
    similarOffersList: similarOffersList,
    clearMap: clearMap,
    offers: offers,
    successHandler: successHandler,
    updateOffers: updateOffers
  };
})();
