'use strict';
(function () {
  var mainMap = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');

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
    offerElementImage.alt = window.data.DEFAULT_OFFER_MESSAGE;
    return offerElement;
  };

  var renderOffers = function (offerList) {
    offerList = offerList.slice(0, 5);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerList.length; i++) {
      fragment.appendChild(renderOffer(offers[i]));
    }
    similarOffersList.appendChild(fragment);
  };

  var updateOffers = function () {
    clearMap();
    var filteredOffers = offers.filter(function (offer) {
      return offer.offer.type === housingType.value || housingType === 'any';
    });
    renderOffers(filteredOffers);
    // console.log(filteredOffers);
  };

  housingType.addEventListener('change', updateOffers);


  var successHandler = function (data) {
    offers = data;
  };


  window.load.loadData(window.data.DATA_URL, successHandler, window.util.errorHandler);

  window.map = {
    mainMap: mainMap,
    mainMapPin: mainMapPin,
    renderOffers: renderOffers,
    similarOffersList: similarOffersList,
    clearMap: clearMap
  };
})();

