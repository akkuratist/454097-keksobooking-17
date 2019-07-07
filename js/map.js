'use strict';
(function () {
  var mainMap = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');

  var renderOffer = function (similarOffer) {
    var offerElement = similarOfferPinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');
    offerElement.style = 'left: ' + similarOffer.location.x + 'px; ' + 'top: ' + similarOffer.location.y + 'px';
    offerElementImage.src = similarOffer.author.avatar;
    offerElementImage.alt = window.data.DEFAULT_OFFER_MESSAGE;
    return offerElement;
  };

  var renderOffers = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderOffer(offers[i]));
    }
    similarOffersList.appendChild(fragment);
  };

  var errorHandler = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    document.body.insertBefore(errorMessage, document.body.children[2]);
  };

  window.map = {
    mainMap: mainMap,
    mainMapPin: mainMapPin,
    renderOffers: renderOffers,
    errorHandler: errorHandler
  };
})();

