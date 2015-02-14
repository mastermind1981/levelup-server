var fs = require("fs");
var marked = require("marked");
var express = require("express");

var application = express();

application["get"]("/", function(request, response)
{
    fs.readFile("./readme.md", function(error, markdown)
    {
        markup = marked(markdown.toString());
        response.send(markup);
    });
});

application["get"]("/users", function(request, response)
{
    response.send(users);
});

application["get"]("/users/:name", function(request, response)
{
    var name = request.params.name;
    response.send(users[name]);
});

application["get"]("/users/:name/untz", function(request, response)
{
    var name = request.params.name;
    
    if(!users[name]) {
        users[name] = {
            name: name,
            lvl: 1,
            xp: 0
        }
    }

    var user = users[name];

    user.xp += 1;
    if(user.xp > 10)
    {
        user.lvl += 1;
        user.xp = 0;
    }

    response.send(user);
});

application.listen(process.env.PORT || 8080);

var users = {};
