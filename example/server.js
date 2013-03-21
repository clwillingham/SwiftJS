var express = require("express"),
    app = express(),
    swift = require('./../index'),
    port = parseInt(process.env.PORT, 10) || 3000;

swift.app(app,  __dirname + '/app');

app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.use(app.router);
});

app.listen(port);