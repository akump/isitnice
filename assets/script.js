const httpOptions = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
};

const status = document.querySelector('#status');
const error = () => status.textContent = 'Unable to retrieve your location';

const appendText = function (text, tag = 'p') {
    const para = document.createElement(tag);
    const node = document.createTextNode(text);
    para.appendChild(node);
    document.body.appendChild(para);
}

const success = async function ({ coords }) {
    appendText(`Found`);
    const { latitude, longitude } = coords;

    const response = await fetch(`/isNice?lat=${latitude}&lon=${longitude}`, { method: 'GET', ...httpOptions });
    let { temp } = await response.json();
    temp = Math.round(temp);
    let distnanceTo69 = 69 - temp;

    if (temp === 69) {
        appendText(`YES`, 'h1');
        appendText(`${temp}° 👌`);
    } else {
        appendText(`NO`, 'h1');
        appendText(`Sadly it's ${temp}° outside. ${distnanceTo69}° away from the perfect temperature 😢`);
    }
}

if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
} else {
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000 });
}

