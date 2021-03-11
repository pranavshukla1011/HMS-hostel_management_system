const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port =  process.env.PORT || 3005;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');//used for session-cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());//calling

app.use(express.static('./assets/dist'));
//extract sytle andscripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'HMS',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
        
}));

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