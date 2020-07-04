const axios = require('axios');
require('dotenv').config();
const { Client } = require('tplink-smarthome-api');

const client = new Client();


function setPlugWeather(){
    const plug = client.getDevice({host: process.env.PLUG_IP}).then((device)=>{
        //device.getSysInfo().then(console.log)
        hour = new Date().getHours();
        axios.get('https://api.darksky.net/forecast/' + process.env.DARKSKY + '/' + process.env.LATITUDE + ',' + process.env.LONGITUDE).then((response) => {
            temp = response.data.currently.temperature
            console.log(temp)
            device.setPowerState(temp > 80 || hour > 20 || hour < 8);
        })
        
    });
}
setPlugWeather();
setInterval(setPlugWeather, 1000 * 60 * 30);
