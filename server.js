const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
//When server receives request with JSON formatted data in body, the bodyParser will parse data intro properties of request object so can data can be accessed more easily
app.use(bodyParser.json());

//All routes are relative to this start point
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);


//Set up Express to serve files from public folder using middleware Express.static
app.use(express.static(__dirname + '/public'));


//Set up a server so it returns same response for any request
app.use((req, res,) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-html')
    res.end('<html><body><h1> This is an Express Server</h1></body></html>')
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}/`)
});

