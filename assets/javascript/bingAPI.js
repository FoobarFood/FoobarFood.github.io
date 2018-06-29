// documentation: https://msdn.microsoft.com/en-us/library/ff701714.aspx
//
// usage of module below:
// bingAPI.getData(address)
//   .then(function(response){
//     console.log(bingAPI.getCoordinates(response));
//   });

var bingAPI = (function(){
  var api_key =  'AuLlmMJ6UtMHxJQyV-wrhPZf8877AO3SrrCAoPWviKDUPoV03gMsDRLwCbmKxqZw';

  function _getQueryUrl(address) {
    var address = address.replace(/ /g, '%20');

    var queryUrl = `http://dev.virtualearth.net/REST/v1/Locations?q=${address}&maxResults=1&key=${api_key}`;
    
    return queryUrl;
  }

  // returns AJAX promise
  function getData(address) {
    var queryUrl = _getQueryUrl(address);
    return $.ajax({
      url: queryUrl,
      method: 'GET'
    });
  }

  function getCoordinates(bingResponse) {
    return bingResponse.resourceSets[0].resources[0].geocodePoints[0].coordinates;
  }

  return {
    getData: getData,
    getCoordinates: getCoordinates
  }
})();