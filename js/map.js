'use strict';
(function () {
  var mainMap = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');
  var pins = similarOffersList.querySelectorAll('.map__pin:not(.map__pin--main)');

  var offers = [];
  var housingType = document.querySelector('#housing-type');

  var clearMap = function () {
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

  var renderOffers = function () {
    var offersList = filterOffers();
    var fragment = document.createDocumentFragment();
    offersList.forEach(function (offer) {
      fragment.appendChild(renderOffer(offer));
    });
    similarOffersList.appendChild(fragment);
    window.card.showCard(filterOffers()[Math.round(Math.random() * filterOffers().length - 0.5)]);
  };

  var filterOffers = function () {
    var filteredOffers = offers.filter(function (offer) {
      return offer.offer.type === housingType.value || housingType.value === 'any';
    });
    return filteredOffers.slice(0, 5);
  };

  var updateOffers = function () {
    clearMap();
    renderOffers();
  };

  housingType.addEventListener('change', updateOffers);


  var successHandler = function (data) {
    offers = data;
    return offers;
  };

  window.load.loadData(window.data.DATA_URL, successHandler, window.util.errorHandler);

  window.map = {
    mainMap: mainMap,
    pins: pins,
    mainMapPin: mainMapPin,
    renderOffers: renderOffers,
    similarOffersList: similarOffersList,
    clearMap: clearMap,
    offers: offers,
    successHandler: successHandler,
    updateOffers: updateOffers
  };
})();
