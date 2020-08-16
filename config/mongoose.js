//require the mongoose package
const mongoose=require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/backend2');

const db=mongoose.connection;

//acquiring the connection
db.on('error',console.error.bind(console,"Error Connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database');
});

module.exports = db;