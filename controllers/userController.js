const User=require('../models/User');
//for password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        res.render('signIn',{
            title:'Sign-in'
        });
    }
    
} 

module.exports.profile=function(req,res){
    if(req.isAuthenticated()){
        res.render('reset',{
            title:'Back End',
            'User':req.user,
        }); 
        
    }
    else{
        res.render('signIn',{
            title:'Sign-in'
        });
    }
}

module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        res.render('signUp',{
            title:'Sign-Up'
        });
    }
    
} 

module.exports.createUser= function(req,res){
    
    if(req.body.confirmPwd!=req.body.password){
        req.flash('error',"Password does not match");
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        
        if(err){req.flash('error',err); return;}
        if(!user){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    console.log("error in hashing password");
                    return ;
                }
                // Store hash in your password DB.
            
                User.create({
                    email:req.body.email,
                    password:hash,
                },function(err,user){
                    if(err){req.flash('error',err); return;}
                    console.log(user);
                    if(err){
                        console.log('Error',err);
                        return ;
                    }
                    return res.redirect('/users/profile');
                })
            });
        }
        else{
            req.flash('success','email already exist: Sign in to continue')
            return res.redirect('/users/sign-in');
        }
    });
    
    
}

module.exports.createSession = function(req,res){
    console.log("Sign in success");
    req.flash('success',"logged in successfully");
    return res.redirect('/users/profile');
}


module.exports.signOut=function(req,res){

    req.logout();
    req.flash('success',"logged out")
    return res.redirect('/');
}

module.exports.update=function(req,res){

    return res.render('update',{
        'title':'Update Password',
        'User':req.user,
    });
}
module.exports.changePwd=function(req,res){
    if(req.body.confirmPwd!=req.body.password){
        req.flash('error',"Password does not match");
        return res.redirect('back');
    }
    if(req.user.id == req.params.id){
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err){
                console.log("error in hashing password");
                return ;
            }
            // Store hash in your password DB.
            User.findByIdAndUpdate(req.params.id,{
                email:req.body.email,
                password:hash,
            },function(err,user){
                console.log("I m Here")
                req.flash('success',"Password updated successfully");
                return res.redirect('/users/profile');
            })
    });
    
    }
    else{
        return res.status(401).send('Unauthorized');
    }

}