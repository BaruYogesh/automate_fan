const axios = require('axios');
require('dotenv').config();
const { Client } = require('tplink-smarthome-api');

const client = new Client();


function setPlugWeather(){
    const plug = client.getDevice({host: '192.168.0.143'}).then((device)=>{
        hour = new Date().getHours();
        axios.get('https://api.darksky.net/forecast/80e2bdad12ff5f90a5f6b6762c90748a/' + process.env.LATITUDE + ',' + process.env.LONGITUDE).then((response) => {
            device.setPowerState(response.data.currently.temperature > 78 || hour > 20 || hour < 8);
        })
        
    });
}

setInterval(setPlugWeather, 1000 * 60 * 30);