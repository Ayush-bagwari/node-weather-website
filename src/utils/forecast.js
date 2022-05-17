const request = require('request');
const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f9df1e992b7fade649c8be5d0e7d413d&query='+lat+','+long;
    request({url , json : true} , (error, {body}) => {
        // const body = JSON.parse(response.body);
        if(error){
            callback('unable to connect to weather service', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ' in the town. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.');
        }
    });

}

module.exports = forecast;