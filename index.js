//Loads the express module
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const path = require('path');
const loginRouter = require('./src/router/view');
const userRouter = require('./src/router/user');
const feedbackRouter = require('./src/router/feedback');
const flightRouter = require('./src/router/flightInformation');
const trips = require("./src/router/mytrips");
const offers = require('./src/router/offers')
const services = require('./src/router/services')
const expressValidator = require('express-validator');
const session= require('express-session');

//Loads the handlebars module
const handlebars = require('hbs');
const { dirname } = require('path');
//const { Session } = require('inspector');

//creates our app server
const app = express();
const server = http.createServer(app);
const port = 3000;
//Sets our app to use handlebars
app.use(bodyparser.json());

app.use(express.json());
app.use(express.static('public'));


app.set('views',path.join(__dirname,'/views/partials'))
app.use(session({secret : 'secret-key',saveUninitialized:false,resave:false}));
app.use(loginRouter);
app.use(userRouter);
app.use(feedbackRouter);
app.use(flightRouter);
app.use(services);
app.use(offers);
app.use(trips);
//Sets handlebars configuration
app.set('view engine','hbs');

//app.set('views', path.join(__dirname, '../views'))



// Make the app listening to this port
server.listen(port,() => console.log('App listening to port ${port}'));