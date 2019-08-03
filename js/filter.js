'use strict';
(function () {
  var housingType = document.querySelector('#housing-type').value;
  var housingPrice = document.querySelector('#housing-price').value;
  var housingRooms = document.querySelector('#housing-rooms').value;
  var housingGuests = document.querySelector('#housing-guests').value;

  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  var defaultValue = 'any';

  var filtersMap = {
    'housing-type': function (val) {
      housingType = val;
    },
    'housing-price': function (val) {
      housingPrice = val;
    },
    'housing-guests': function (val) {
      housingGuests = val;
    },
    'housing-rooms': function (val) {
      housingRooms = val;
    }
  };

  var Prices = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': 50000
  };

  var filterByHousingType = function (it) {
    return (it.offer.type === housingType) || (housingType === defaultValue);
  };

  var filterByHousingPrice = function (it) {
    if (housingPrice === defaultValue) {
      return true;
    }
    if (housingPrice === 'high') {
      return it.offer.price >= Prices[housingPrice];
    }
    return it.offer.price >= Prices[housingPrice].min &&
    it.offer.price < Prices[housingPrice].max;
  };

  var filterByHousingGuests = function (it) {
    return (it.offer.guests.toString() === housingGuests) || (housingGuests === defaultValue);
  };

  var filterByHousingRooms = function (it) {
    return (it.offer.rooms.toString() === housingRooms) || (housingRooms === defaultValue);
  };

  var filterByFeature = function (feature, it) {
    return (!feature.checked) || (it.offer.features.indexOf(feature.value) !== -1);
  };

  var filterOffers = function (it) {
    return filterByHousingType(it) &&
    filterByHousingPrice(it) &&
    filterByHousingGuests(it) &&
    filterByHousingRooms(it) &&
    filterByFeature(featureWifi, it) &&
    filterByFeature(featureDishwasher, it) &&
    filterByFeature(featureParking, it) &&
    filterByFeature(featureConditioner, it) &&
    filterByFeature(featureElevator, it) &&
    filterByFeature(featureWasher, it);
  };


  window.filters = {
    filterOffers: filterOffers,
    Map: filtersMap,
  };

})();
