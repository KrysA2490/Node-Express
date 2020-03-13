const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
//When server receives request with JSON formatted data in body, the bodyParser will parse data intro properties of request object so can data can be accessed more easily
app.use(bodyParser.json());

app.all('/campsites', (req, res, next) => {
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    //next() passes control of app routing to next relevant routing method after this one. otherwise it would stop here and not go further
    next();
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you')
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description ${req.body.description}`)
});

app.put('/campsites', (req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /campsites')
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
})

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`)
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});


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

