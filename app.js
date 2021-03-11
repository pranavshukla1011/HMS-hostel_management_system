const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port =  process.env.PORT || 3005;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

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


//use express router
app.use('/', require('./routes'));


app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`); 
    }
    console.log(`Server is running on port: ${port}`);
});