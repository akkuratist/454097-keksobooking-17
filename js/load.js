'use strict';
(function () {
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
      if (xhr.status === 200) {
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

    xhr.timeout = 10000; // 10s

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = {
    Url: Url,
    load: load,
    Methods: Methods
  };

})();
