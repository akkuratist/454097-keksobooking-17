'use strict';
(function () {
  var MIN_LOCATION_Y = 60;
  var MAX_LOCATION_Y = 630;
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 60;
  var MAP_PIN_HALFWIDTH = MAP_PIN_WIDTH / 2;
  var DefaultAddress = {
    X: 570,
    Y: 375
  };
  var setAddress = function () {
    var PinCoordX = parseInt(window.map.mainPin.style.left, 10);
    var PinCoordY = parseInt(window.map.mainPin.style.top, 10);
    var offerAddressX = PinCoordX + MAP_PIN_HALFWIDTH;
    var offerAddressY = Math.min(MAX_LOCATION_Y, Math.max(MIN_LOCATION_Y, PinCoordY));
    window.form.offerAddress.value = offerAddressX + ', ' + offerAddressY;
  };

  var setDefaultAddress = function () {
    window.map.mainPin.style.left = DefaultAddress.X + 'px';
    window.map.mainPin.style.top = DefaultAddress.Y + 'px';
    setAddress();
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var left = moveEvt.clientX + window.pageXOffset - MAP_PIN_WIDTH;
      var top = moveEvt.clientY + window.pageYOffset - MAP_PIN_HEIGHT;
      window.map.mainPin.style.left = Math.min(window.map.main.offsetWidth - MAP_PIN_HALFWIDTH, Math.max(-MAP_PIN_HALFWIDTH, left)) + 'px';
      window.map.mainPin.style.top = Math.min(MAX_LOCATION_Y, Math.max(MIN_LOCATION_Y, top)) + 'px';
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
