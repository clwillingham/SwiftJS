var fs = require('fs'),
    _ = require('underscore');

exports.models = {};

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function setRenderRoot(viewRoot){
    return function(req, res, next){
        var _render = res.render;
        res.render = function(view, options, callback) {
            _render.call(res, viewRoot + view, options, callback);
        };
        next();
    }
}

function addModels(){
    return function(req, res, next){
//        this.models = exports.models;
        _.extend(this, exports.models);
        next();
    }
}

exports.run = function(config, cwd){
    var config = require(process.cwd()+'/config.json');
    var express = require('express'),
        swift = exports,
        mongoose = require('mongoose'),
        app = express();
    mongoose.connect('mongodb://localhost/app');
    for(var swiftApp in config.apps){
        var route = config.apps[swiftApp];
        swift.app(app, route, cwd + '/' + swiftApp);
    }
    app.configure(function () {
        app.use(express.methodOverride());
        app.use(express.bodyParser());
        app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));

        app.set('views', cwd + '/app/views');
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);
        app.use(app.router);
    });

    app.listen(config.port || 3000);
}

exports.app = function(app, appDirOrAppRootUrl, appDir){
    var rootUrl = '';

    if(appDir){
        rootUrl = appDirOrAppRootUrl;
    }else{
        appDir = appDirOrAppRootUrl;
    }
    app.models = {};
    var middleware = {};
    var modelsDir = appDir +'/models/';
    var controllersDir = appDir + '/controllers/';
    var middlewareDir = appDir + '/middleware/';
    console.log(modelsDir);
    console.log(controllersDir);
    var modelFiles;
    var controllerFiles;
    var middlewareFiles;
    if(fs.existsSync(modelsDir))
        modelFiles = fs.readdirSync(modelsDir);
    if(fs.existsSync(controllersDir))
        controllerFiles = fs.readdirSync(controllersDir);
    if(fs.existsSync(middlewareDir))
        middlewareFiles = fs.readdirSync(middlewareDir);
    console.log(middlewareFiles)
    if(modelFiles != null){
        for(var i in modelFiles){
            var modelFile = modelFiles[i];
            var model = require(modelsDir + modelFile);
            var modelName = modelFile.split(".")[0];
            exports.models[modelName] = model;
        }
    }
    if(middlewareFiles != null){
        for(var i in middlewareFiles){
            var middlewareFile = middlewareFiles[i];
            var middlewareData = require(middlewareDir + middlewareFile);
            console.log(middlewareData);
            var name = middlewareFile.split('.')[0];
            middleware[name] = middlewareData.actions;
        }
    }

    console.log(middleware)
    if(controllerFiles != null){
        for(var i in controllerFiles){
            var controllerFile = controllerFiles[i];
            var controller = require(controllersDir + controllerFile);
            var controllerName = controller.name || controllerFile.split('.')[0];
            var root = controller.root || '/'+controllerName;
            delete controller.root;
            var routes = controller.routes;
            var actions = controller.actions
            controller.models = exports.models;
            for(var route in routes){
                var method = route.split(' ')[0];
                var path = rootUrl + root + (route.split(' ')[1] || '');
                console.log(method + " " + path + ': ' + routes[route]);
                if(typeof(routes[route]) == 'string'){
                    app[method](path, setRenderRoot(controllerName + '/'), addModels(), actions[routes[route]]);
                }else{
                    var localMiddleware = [];
                    for(var i in routes[route]){
                        var actionName = routes[route][i];
                        var action = null;
                        if(actionName.indexOf('.') !== -1){
                            var actionPath = actionName.split('.');
                            action = middleware[actionPath[0]][actionPath[1]];
                        }else{
                            action = actions[actionName];
                        }

                        localMiddleware.push(action)
                    }
                    app[method].apply(app, [path].concat(setRenderRoot(controllerName + '/'), addModels(), localMiddleware));
                }
            }
        }
    }

    return app;
}