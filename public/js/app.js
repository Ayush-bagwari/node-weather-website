
const form = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const img = document.querySelector('img');

form.addEventListener('submit',(e) => {
    msg1.textContent = 'Loading...';
    const location = input.value;
    e.preventDefault();
    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error;
                msg2.textContent = '';
            }else{
                //  console.log(data);
                msg1.textContent = data.location;
                msg2.textContent = data.data;
                
                // img.src= data.data.weather_icons[0];
            }
            // const lat = data.features[0].center[0];
            // const long = data.features[0].center[1];
            // fetch('http://api.weatherstack.com/current?access_key=f9df1e992b7fade649c8be5d0e7d413d&query='+lat+','+long).then((response)=>{
            //     response.json().then((data)=>{
            //         console.log(data);
            //     });
            // });
        });
    });
});