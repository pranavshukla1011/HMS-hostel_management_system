const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port =  process.env.PORT || 3005;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');//used for session-cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); 

app.use(express.urlencoded());

app.use(cookieParser());//calling

app.use(express.static('./assets/dist'));
const bodyParser = require('body-parser');
//extract sytle andscripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie into the database
app.use(session({
    name: 'HMS',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect mongo setup ok');
        }
    )
        
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedStudent);//any request tht comes in, this function will be called and student will be set in locals and student will be accessible in views

//use express router
app.use('/', require('./routes'));


app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`); 
    }
    console.log(`Server is running on port: ${port}`);
});