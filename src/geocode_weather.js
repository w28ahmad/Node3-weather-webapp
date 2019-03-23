const request = require('request');

var geocode_weather = (address, callback) => {
    address = encodeURIComponent(address)
    var url ='http://www.mapquestapi.com/geocoding/v1/address?key=t3oFn0qIWd19GTTbQBJxIr0tJiGRcf8c&location='+address;

    request({
        url, 
        json : true
    }, (error, response, body)=>{
        if(!error){
            var address = body.results[0].providedLocation.location;
            var lat = body.results[0].locations[0].latLng.lat;
            var lng = body.results[0].locations[0].latLng.lng;
            request({
                url: `https://api.darksky.net/forecast/29df10f75fb4f7f9576b57ffb78c939c/${lat},${lng}`, 
                json: true
            }, (error, response, body)=>{
                fahrenheit =  (parseFloat(body.currently.temperature));
                feelsFahrenheit =  parseFloat(body.currently.apparentTemperature);

                callback(undefined, {
                    temp : (fahrenheit-32)*(5/9),
                    apptemp :  (feelsFahrenheit-32)*(5/9)
                })

            })
        }else{
            callback(error)
        }
    })
}

module.exports.geocode_weather = geocode_weather;
