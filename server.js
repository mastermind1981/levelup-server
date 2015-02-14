var express = require("express");

var application = express();

application.get("/", function(request, response)
{
    response.send("Hello, and welcome to LevelUp!");
});

application.get("/:name", function(request, response)
{
    var name = request.params.name;
    
    if(!users[name]) {
        users[name] = {
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

    response.send(name + ": xp is " + user.xp + ", lvl is " + user.lvl);
})

application.listen(8080);

var users = {};
