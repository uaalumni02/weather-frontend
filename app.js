const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    return res.render('home')
});

app.post('/', (req, res) => {
    const city = req.body.city;

    console.log(city);
    const requestUrl = 'http://localhost:3000/api/search?q=' + city;

    return axios.get(requestUrl)
        .then((response) => {
            const responseData = response.data;

            return res.status(200)
                .render('result', { response: responseData });
        })
        .catch((err) => {
            res.send(err.message);
        });
});

app.listen(8080, () => {
    console.log('We are live on 8080');
})