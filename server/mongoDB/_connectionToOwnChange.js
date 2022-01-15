const mongoose = require('mongoose');





    // The file should be named 'connection.js' and own mongodb's string






    //  ES6 Promises
    mongoose.Promise = global.Promise;

    // Connect to mongodb
    mongoose.connect('YOUR MONGODBS STRING HERE', { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.once('open', function(){
        console.log("Connection with mongoDB has been made!");
    }).on('error', function(err){
        console.log("Connection with mongoDB ended with error!");
        console.log(err);
    });

module.exports = mongoose