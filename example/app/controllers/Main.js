/**
 * Created with JetBrains WebStorm.
 * User: clwillingham
 * Date: 3/21/13
 * Time: 2:43 PM
 * To change this template use File | Settings | File Templates.
 */


module.exports = {
    root: '/',
    routes: {
        'get': ['someMiddlewhere', 'index'],
        'get test1': 'test1',
        'get test2': 'test2',
        'get test3': 'test3'
    },

    actions: {
        someMiddlewhere: function(req, res, next){
            next();
        },
        index: function(req, res){
            res.render('index');
        },
        test1: function(req, res){
            res.send('test1');
        },
        test2: function(req, res){
            res.send('test2');
        },
        test3: function(req, res){
            res.send('test3');
        }
    }
}