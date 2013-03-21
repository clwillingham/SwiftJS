var fs = require('fs');

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

exports.app = function(app, appDirOrAppRootUrl, appDir){
    var rootUrl = '';

    if(appDir){
        rootUrl = appDirOrAppRootUrl;
    }else{
        appDir = appDirOrAppRootUrl;
    }
    var modelsDir = appDir +'/models/';
    var controllersDir = appDir + '/controllers/';
    console.log(modelsDir);
    console.log(controllersDir);
    var modelFiles = fs.readdirSync(modelsDir);
    var controllerFiles = fs.readdirSync(controllersDir);

    for(var i in controllerFiles){
        var controllerFile = controllerFiles[i];
        var controller = require(controllersDir + controllerFile);
        var controllerName = controller.name || controllerFile.split('.')[0];
        var routes = {};
        var root = controller.root || '/'+controllerName;
        delete controller.root;
        var routes = controller.routes;
        var actions = controller.actions
        for(var route in routes){
            var method = route.split(' ')[0];
            var path = rootUrl + root + (route.split(' ')[1] || '');
            console.log(method + " " + path + ': ' + routes[route]);
            if(typeof(routes[route]) == 'string'){
                app[method](path, actions[routes[route]]);
            }else{
                var middlewhare = [];
                for(var i in routes[route]){
                    middlewhare.push(actions[routes[route][i]])
                }
                app[method].apply(app, [path].concat(middlewhare));
            }
        }
    }

    return app;
}