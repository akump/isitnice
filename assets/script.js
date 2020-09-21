
const status = document.querySelector('#status');
let divCount = 0;

function appendText(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.body.appendChild(para);
}

async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    appendText(`Location found.`);

    const response = await fetch(`/isNice?lat=${latitude}&lon=${longitude}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    const data = await response.json();

    if (data.main.temp > 69 && data.main.temp < 70) {
        appendText(`It's currently a wonderful ${data.main.temp}° 👌`);
    } else {
        appendText(`Yikes it's ${data.main.temp}° out there. Maybe one day it'll be 69° 👌`);
    }
}

function error() {
    status.textContent = 'Unable to retrieve your location';
}

if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
} else {
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 50000 });
}

