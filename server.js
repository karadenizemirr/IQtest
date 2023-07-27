//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/iqtest'));

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/iqtest/'}),
);

app.post('/paymentResult', (req,res) => {
    res.cookie('paymentResult', JSON.stringify(req.body))
    res.redirect('http://localhost:4200/payment')
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);