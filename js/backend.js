'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var Url = {
    DATA_URL: 'https://js.dump.academy/keksobooking/data',
    FORM_URL: 'https://js.dump.academy/keksobooking'
  };
  var Methods = {
    GET: 'GET',
    POST: 'POST'
  };
  var load = function (url, onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'секунд');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    Url: Url,
    load: load,
    Methods: Methods
  };

})();
