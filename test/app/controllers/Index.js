module.exports = {
    root: '/',
    routes: {
//        'get': ['someMiddlewhere', 'index'], //call some middleware before calling index action.
        'get': 'index' //or just call action directly (providing no path indicates root path for controller)
    },

    actions: {
        index: function(req, res){
            res.render('index'); //renders from directory views/Index
        }
    }
}