// const { resolveMx } = require("dns");

// const { request } = require("http");

const submitButton = document.getElementById('submitButton');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('cityName');
const searched_city = document.getElementById('searched_city');

const apiKey = 'PGCcRhAe4Nf6nVB8/yvtLA==FScqfswMpvZAEKMb';

const getInfo = async (event)=>{
    event.preventDefault();
    let city = cityName.value;
    if(city===""){
        searched_city.innerHTML = 'Oops! Enter a valid City name!';
        temperature.innerHTML = 0;
    }else{
        console.log('here1');
        try{
            let url_city = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=India`;
            console.log(url_city);
            let ll_resp = await fetch(url_city, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json'
                  },
            });
            
            let  ll_data = await ll_resp.json();
            let size = ll_data.length;
            let i = 0;
            if(size>1){
                alert('he');
                var state = prompt('Enter the name of State');
                for(i=0;i<size;i++){
                    if(ll_data[i].state === state)break;
                }
            }
            
            let lon = ll_data[i].longitude;
            let lat = ll_data[i].latitude;
            let url_ll = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3242388608cd19f4a9e17ce690301166`;
            const resp = await fetch(url_ll);
            const data = await resp.json();
            searched_city.innerHTML = `${ll_data[i].name}, ${ll_data[i].state}`;
            temperature.innerHTML = Math.floor(data.main.temp - 273);
        }
        catch(err){
            searched_city.innerHTML = 'Oops! Enter a valid City name!';
        }
    }
}

submitButton.addEventListener('click', getInfo);