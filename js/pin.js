'use strict';
(function () {
  var DefaultAddress = {
    X: 570,
    Y: 375
  };
  var setAddress = function () {
    var offerAddressX = parseInt(window.map.mainMapPin.style.left, 10) + window.data.MAP_PIN_HALFWIDTH;
    var offerAddressY = parseInt(window.map.mainMapPin.style.top, 10) + window.data.MAP_PIN_HEIGHT;
    window.form.offerAddress.value = offerAddressX + ', ' + offerAddressY;
  };

  var setDefaultAddress = function () {
    window.map.mainMapPin.style.left = DefaultAddress.X + 'px';
    window.map.mainMapPin.style.top = DefaultAddress.Y + 'px';
    setAddress();
  };

  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var left = moveEvt.clientX - window.map.mainMap.offsetLeft - window.data.MAP_PIN_HALFWIDTH;
      var top = moveEvt.clientY - window.map.mainMap.offsetTop;
      window.map.mainMapPin.style.left = Math.min(window.map.mainMap.offsetWidth - window.data.MAP_PIN_HALFWIDTH, Math.max(-window.data.MAP_PIN_HALFWIDTH, left)) + 'px';
      window.map.mainMapPin.style.top = Math.min(window.data.MAX_LOCATION_Y, Math.max(window.data.MIN_LOCATION_Y, top)) + 'px';
      setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setAddress();
  window.pin = {
    setAddress: setAddress,
    setDefaultAddress: setDefaultAddress
  };
})();
