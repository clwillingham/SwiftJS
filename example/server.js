var express = require("express"),
    app = express(),
    namespace = require('express-namespace'),
    expressMVC = require('./../index'),
    port = parseInt(process.env.PORT, 10) || 3000;

expressMVC.app(app,  __dirname + '/app');

//app.get.apply(this, ['/', function(req,res){
//    res.send('fdsafasdfsa');
//}]);

app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(app.router);
});

app.listen(port);