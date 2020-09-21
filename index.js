import express from 'express';
import path from 'path';
import superagent from 'superagent';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = 3000;

app.use('/assets', express.static(`${__dirname}/assets/`));

app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/assets/index.html`)));

app.get('/isNice', async (req, res) => {
    const { body } = await superagent.post(`api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=imperial&appid=${process.env.API_KEY}`);
    res.send(body);
});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));