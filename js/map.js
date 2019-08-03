'use strict';
(function () {
  var MAX_PINS = 5;
  var DEFAULT_FILTER_VALUE = 'any';
  var filters = document.querySelector('.map__filters');
  var filterElements = {
    selects: filters.querySelectorAll('.map__filter'),
    features: filters.querySelectorAll('input[name="features"]'),
  };
  var main = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = similarOffersList.querySelectorAll('.map__pin:not(.map__pin--main)');

  var offers = [];
  var clear = function () {
    window.card.close();
    var offerPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    offerPins.forEach(function (offerPin) {
      offerPin.remove();
    });
  };

  var clearFilters = function () {
    filterElements.selects.forEach(function (select) {
      select.value = DEFAULT_FILTER_VALUE;
    });
    filterElements.features.forEach(function (feature) {
      feature.removeAttribute('checked');
    });
  };

  var renderOffer = function (similarOffer) {
    var offerElement = similarOfferPinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');
    offerElement.style = 'left: ' + similarOffer.location.x + 'px; ' + 'top: ' + similarOffer.location.y + 'px';
    offerElementImage.src = similarOffer.author.avatar;
    offerElementImage.alt = similarOffer.offer.description;
    offerElement.addEventListener('click', function () {
      window.show(similarOffer);
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
    return filteredOffers.slice(0, MAX_PINS);
  };

  var updateOffers = function () {
    clear();
    renderOffers(getFilteredOffers());
  };


  filters.addEventListener('change', function (evt) {
    if (evt.target.name !== 'features') {
      window.filters.Map[evt.target.name](evt.target.value);
    }

    window.debounce(updateOffers);

  });


  var onSuccess = function (data) {
    offers = data;
    return offers;
  };

  window.backend.load(window.backend.Url.DATA_URL, onSuccess, window.util.onError, window.backend.Methods.GET);

  window.map = {
    main: main,
    filters: filters,
    filterElements: filterElements,
    pins: pins,
    mainPin: mainPin,
    getFilteredOffers: getFilteredOffers,
    renderOffers: renderOffers,
    similarOffersList: similarOffersList,
    clear: clear,
    clearFilters: clearFilters,
    offers: offers,
    onSuccess: onSuccess,
    updateOffers: updateOffers
  };
})();
