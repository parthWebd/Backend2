const express=require('express');
const port=8000;
const app=express();
//to use Db
const db=require('./config/mongoose');
//to use express session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
// to permanently store the session cookie
const mongoStore=require('connect-mongo')(session);
//to use flash message
const flash=require('connect-flash');
const customMWare=require('./config/middleware');


const User=require('./models/User');
//to Use layouts
const expressLayouts = require('express-ejs-layouts');

// to encode the parsed values
app.use(express.urlencoded())

//to use static files
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// to use EJS
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
   name:'Backend2',
   secret: "something",
   saveUninitialized:false,
   resave:false, 
   cookie:{
       maxAge: (1000*60*2),
   },
   store:new mongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
   },function(err){
       console.log(err || 'Connect Mongo DB setup ok');
   })
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMWare.setFlash);



app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('server running on port',port);
})