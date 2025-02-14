

const API_KEY = `your_api_key`;


const temp  = document.getElementById('temp');
const humidity  = document.getElementById('humid');
const aqi  = document.getElementById('aiq');
const aiqDesc  = document.getElementById('aiq-desc');
const weatherInfo  = document.getElementById('info');
const title = document.getElementById('title');


async function  getWeather(lat, long) {
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}&aqi=yes`;
    const res = await fetch(url);
    const jsonRes = await res.json();
    
    // getting ionly required objects
    const {current, location} = jsonRes

    const weatherData  = {
        "temp":current.temp_c,
        "humid":current.humidity,
        "aqi":current.air_quality['us-epa-index'],
        "info": current.condition,
        "area":location.name
    };

    return weatherData;
}

function getWeatherData(data){

    if(!data){
        weatherInfo.innerHTML = "⚠️ Unable to fetch weather data."
    }

    temp.innerHTML = data.temp + '°C';
    humidity.innerHTML = data.humid+'%';
    aqi.innerHTML = data.aqi;
    aiqDesc.innerHTML = aqiStatus(data.aqi);
    title.innerHTML = '🌤 '+data.area+"'s Weather"
    weatherInfo.innerHTML = `Today's Weather condition is ${data.info.text}<img src="${data.info.icon}" class = "w-12 h-12 inline">`;
}


function aqiStatus(aqi){
    if(aqi >= 0 && aqi <=50){
        return 'Good';
    }
    else if(aqi>=51 && aqi <=100){
        return 'Unhealthy for Sensitive Groups';
    }
    else if(aqi>=151 && aqi <=200){
        return 'Unhealthy';
    }
    else if(aqi>=201 && aqi <=300){
        return 'Very Unhealthy';
    }
    
    return 'Hazardous';
}


function dispCordinates(pos){    

    const crds = pos.coords;
    getWeather(crds.latitude, crds.longitude).then(getWeatherData); 
}



navigator.geolocation.getCurrentPosition(dispCordinates,()=>{
    weatherInfo.innerHTML = "Location Access Denied";
});
