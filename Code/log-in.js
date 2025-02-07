var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://prestige-5017.restdb.io/rest/log-in",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "<67a5ad259c9797c0ab1b2a7c>",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });