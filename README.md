SwiftJS
==========
SwiftJS is an MVC framework with the goal of making sense.

Why?
---------
when i first started figuring out MVC Frameworks, i started with rails. From what i originally heard about rails, you'd think it was the most magical awesome framework in the world...
one flaw, to a noob just getting into Ruby, Rails is ridiculously complicated and large. If you know how to use rails, you can make anything in a few hours. if your new to rails though, your pretty much doomed.
then i got into Node and Expressjs. Express is simple, insanely fast, easy to use and really good for small projects that don't have a lot of routes.
Once you start making more complex projects with express though, you'll find yourself basically making your own MVC framework for each project.
I've looked a lot, there are a lot of different MVC frameworks for rails and NodeJS, but none of them really have the flexibility and simplicity i was looking for.
SailsJS is probably the closest to what i wanted, but i wanted something a little simpler. So i made SwiftJS (originally called ExpressMVC until i found out that already exists)

How?
--------

Easy, first install Swift:
```
npm install -g swift.js
```
Then create a project:
```
swift gen-project MyProject
```
Then run the project
```
node server.js
```
oh... you want to actually make something more than a hello world? then keep on reading

Controllers
-----------
Controllers in swift are split into two parts, Routes and Actions
Routes map url routes to actions. Actions are response functions or middleware.
```javascript
module.exports = {
    root: '/', //root is optional, if not set, root will be the name of the controller
    routes: {
//        'get': ['someMiddlewhere', 'index'], //call some middleware before calling index action.
        'get /<route>': 'index' //or just call action directly (providing no path indicates root path for controller)
    },

    actions: {
        index: function(req, res){
            res.render('index'); //renders from directory views/Index/
        }
    }
}
```

Views
--------
Nothing special has been done with views. Views are the same as express views.
only importent detail about views is that the res.render() function renders views from views/<controller name>/
instead of the root view. 
