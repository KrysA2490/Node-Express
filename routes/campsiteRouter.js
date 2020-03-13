//File contains code for handling REST API endpoints for campsites and campsites/campsiteId

const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')

//Single statement (chained) handles all endpoints for routing to campsites
.all((req, res, next) => {
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    //next() passes control of app routing to next relevant routing method after this one. otherwise it would stop here and not go further
    next();
})

.get((req, res) => {
    res.end('Will send all the campsites to you')
})

.post( (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description ${req.body.description}`)
})

.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /campsites')
})

.delete((req, res) => {
    res.end('Deleting all campsites');
});


module.exports = campsiteRouter;