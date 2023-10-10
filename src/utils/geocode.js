const request = require('request');
// const weatherApi = (data , callback) =>{
//     const url = 'http://api.weatherstack.com/current?access_key=f9df1e992b7fade649c8be5d0e7d413d&query=30.713053220508474,%2076.69688929085605';

//     request({url : url , json : true} , (error, response) => {
//         // const body = JSON.parse(response.body);
//         if(error){
//             callback('unable to connect to weather service', undefined);
//         }
//         else if(response.body.error){
//             callback('Unable to find location', undefined);
//         }else{
//         callbac(undefined, response.body.current);
//         }
//     });

// }


// const url_geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoiYXl1c2hiZzEwIiwiYSI6ImNsMjlyanptdDAwaGkzY3FzNjhwM3RjZ3cifQ.E7H4JYZ99HrywO73CSk9BA';
// request({url : url_geocode , json : true} , (error, response) => {
//     // const body = JSON.parse(response.body);
//     if(error){
//         console.log('unable to connect to geolocation service');
//     }else{
//     const lat = response.body.features[0].center[0];
//     const long = response.body.features[0].center[1];
//     console.log(lat , long);
//     }
// });


const geocode = (address, callback) => {
   const url = 
   'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=2&access_token=pk.eyJ1IjoiYXl1c2hiZzEwIiwiYSI6ImNsMjlyanptdDAwaGkzY3FzNjhwM3RjZ3cifQ.E7H4JYZ99HrywO73CSk9BA';
   request( {url , json : true} , (error, {body}) => {
    // console.log(body.features[0]);
    // const body = JSON.parse(response.body);
   if(error){
    callback('unable to connect to geolocation service' , undefined);
    }else if(body.features.length === 0){
    callback('Sorry not able to found the location',undefined);
    }else{
    callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
    });
    }
    });
}
module.exports = geocode;