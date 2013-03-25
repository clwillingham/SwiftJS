/**
 * Created with JetBrains WebStorm.
 * User: chris
 * Date: 3/24/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */


exports.actions = {
    adminOnly: function(req, res, next){
        console.log('Admin check');
        next();
    }
}