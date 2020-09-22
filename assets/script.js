
const httpOptions = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
};

const status = document.querySelector('#status');
const is69 = num => num > 69 && num < 70;
const error = () => status.textContent = 'Unable to retrieve your location';

const appendText = function (text) {
    const para = document.createElement('p');
    const node = document.createTextNode(text);
    para.appendChild(node);
    document.body.appendChild(para);
}

const success = async function ({ coords }) {
    appendText(`Location found.`);
    const { latitude, longitude } = coords;

    const response = await fetch(`/isNice?lat=${latitude}&lon=${longitude}`, { method: 'GET', ...httpOptions });
    const { temp } = await response.json();

    if (is69(temp)) {
        appendText(`It's currently a wonderful ${temp}° 👌`);
    } else {
        appendText(`Yikes it's ${temp}° out there. Maybe one day it'll be 69° 👌`);
    }
}

if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
} else {
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000 });
}

