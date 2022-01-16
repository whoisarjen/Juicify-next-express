const mongoose = require('mongoose');

    //  ES6 Promises
    mongoose.Promise = global.Promise;

    // Connect to mongodb
    mongoose.connect('mongodb://Arjen:Preetini49e89d5b@86.106.91.210:27017/test?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.once('open', function(){
        console.log("Connection with mongoDB has been made!");
    }).on('error', function(err){
        console.log("Connection with mongoDB ended with error!");
        console.log(err);
    });

module.exports = mongoose