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
        'get': ['someMiddlewhere', 'index']
    },

    actions: {
        someMiddlewhere: function(req, res, next){
            next();
        },
        index: function(req, res){
            res.send('success');
        }
    }
}