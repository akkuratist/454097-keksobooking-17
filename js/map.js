'use strict';
(function () {
  var mainMap = document.querySelector('.map');
  var similarOffersList = document.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');
  var createOffers = function (usersCount) {
    var similarOffers = [];
    for (var i = 1; i <= usersCount; i++) {
      var similarOffer = {};
      similarOffer.author = {
        avatar: 'img/avatars/user0' + i + '.png'
      };
      similarOffer.offer = {
        type: window.util.getRandomElement(window.form.roomSelect.options)
      };
      similarOffer.location = {
        x: (window.util.getRandomNumber(window.data.MAX_LOCATION_X)) - window.data.MAP_PIN_HALFWIDTH,
        y: window.data.MIN_LOCATION_Y + (window.util.getRandomNumber(window.data.MAX_LOCATION_Y - window.data.MIN_LOCATION_Y)) - window.data.MAP_PIN_HEIGHT
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
    offerElementImage.alt = window.data.DEFAULT_OFFER_MESSAGE;
    return offerElement;
  };

  var renderOffers = function () {
    var similarOffers = createOffers(window.data.OFFERS_COUNT);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < similarOffers.length; i++) {
      fragment.appendChild(renderOffer(similarOffers[i]));
    }
    similarOffersList.appendChild(fragment);
    mainMap.classList.remove('map--faded');
  };


  window.map = {
    mainMap: mainMap,
    mainMapPin: mainMapPin,
    renderOffers: renderOffers
  };
})();
