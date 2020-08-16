const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
// tell passport to use google strategy
passport.use(new googleStrategy({
    clientID: "393512662038-7nja4h927fs0vr695eb8me5nv9kol6r8.apps.googleusercontent.com",
    clientSecret:"ME9IN924lEHTjXxLLkcSCY4N",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in 5555 google strategy',err);return ;}

            // console.log(profile);
            if(user){
                // if found set this as req.user
                return done(null,user);
            }
            else{
                //if not found, create the user and set it as req.user
                User.create({
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){console.log('error in 3333 google strategy',err);return ;}
                     return done(null,user);
                })
            }
        })
    }
))


module.exports = passport;
