const User=require('../models/User');
const { localsName } = require('ejs');

module.exports.home=function(req,res){
    if(req.user){
        res.render('reset',{
            title:'Back End',
            'User':req.user,
        });  
    }
    else{
        return res.render('home',{
            'title': 'Backend2',
            'User':req.user,
        });
    }
    
}