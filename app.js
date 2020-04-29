const express = require('express');
const bodyParser = require('body-parser');
const { ExpressPeerServer } = require('peer');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const app = express();

// Models
const User = require('./models/User');

// Environment Variables
require('dotenv').config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-zlxgj.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// Mongo DB STore
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Middlewares
const auth = require('./middleware/isAuth');


// View Engines
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(bodyParser.json());

// Statically serving files 
app.use(express.static(__dirname + '/public'));

// Session Middleware
app.use(session({
    secret: 'You dont know the secret of this project and can never know 8860119880',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    }
}));

// 404 Not Found Page!
app.get('/', (req, res, next) => {
    if(req.session && req.session.isLoggedIn) {
        return res.redirect('/dashboard/home');
    }
    return res.redirect('/auth/login');
})


// Custom Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/room', roomRoutes);


// 404 Not Found Page!
app.use('/', (req, res, next) => {
    res.render('404')
})

// Special Middleware Function to handle errors 
app.use((error, req, res, next) => {
    err = error.message;
    if(!err) {
        err = error;
    }
    console.log(error);
    return res.json({
        acknowledgement: {
            type: 'error',
            message: err
        }
    });
})

// Connection to Mongo DB and Socket.io and Server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
    
        const server = app.listen(process.env.PORT);
        const io = require('socket.io')(server, {
            pingTimeout: 5000,
            pingInterval: 10000
        });

        const peerServer = ExpressPeerServer(server, {
            debug: true,
            path: '/myapp'
        });

        app.use('/peerjs', peerServer);

        app.set('socket.io', io);
        console.log(`Server started on ${process.env.PORT}`);
    })
    .catch(err => console.log(err));