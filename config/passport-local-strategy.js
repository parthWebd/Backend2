
const passport = require('passport');
//for password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/User');
//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    },
    function(req,email,password,done){
        //find the usher and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding user");
                return done(err);
            }
            if(!user){
                req.flash('error',"Invalid Username , Password");
                console.log("Invalid Username , Password");
                return done(null,false);
            }
            bcrypt.compare(req.body.password, user.password, function(err, res) {
                if(res) {
                    return done(null,user);
                } else {
                    req.flash('error',"Invalid Username , Password");
                    console.log("Invalid Username , Password");
                    return done(null,false);
                } 
              });
            
        });

    }
));

//serializing the User to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the key 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null,user);
    })
})
//check if the user is Authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuhtenticated){
        //req.user contains the current signed in user from the session cookie.
        //we are sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;