const axios = require('axios');

var geocode = (address) => {
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = "http://www.mapquestapi.com/geocoding/v1/address?key=t3oFn0qIWd19GTTbQBJxIr0tJiGRcf8c&location="+encodedAddress;
    
    return axios.get(geocodeUrl).then((response)=>{
        var lat = response.data.results[0].locations[0].latLng.lat;
        var lng = response.data.results[0].locations[0].latLng.lng;
        var weatherUrl = `https://api.darksky.net/forecast/29df10f75fb4f7f9576b57ffb78c939c/${lat},${lng}`;
        return axios.get(weatherUrl);
    }).then((response)=>{
        var fahrenheit = parseFloat(response.data.currently.temperature);
        var feelsFahrenheit = parseFloat(response.data.currently.apparentTemperature);
        var temperature = ((fahrenheit-32)*(5/9)).toFixed(2);
        var apparentTemprature = ((feelsFahrenheit-32)*(5/9)).toFixed(2);
        return {
            temperature,
            apparentTemprature
        };
    }).catch((e)=>{
        if(e.code === "ENOTFOUND"){
            console.log("Unable to connect to API servers");
        }else{
            console.log("An error has occurred")
        }
        return "error"
    })
}

module.exports.geocode = geocode;