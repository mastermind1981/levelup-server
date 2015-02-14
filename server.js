//////////////
//Importing//
////////////

var fs = require("fs");
var http = require("http");
var marked = require("marked");
var express = require("express");

///////////////
//Databasing//
/////////////

var users = {};

////////////
//Routing//
//////////

var application = express();

application["get"]("/", function(request, response)
{
    fs.readFile("README.md", function(error, markdown)
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
    
    if(!users[name])
    {
        users[name] =
        {
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

////////////
//Serving//
//////////

var server = http.Server(application);
server.listen(80, function()
{
    console.log("LevelUp is on!");
});

//////////////
//Streaming//
////////////

var io = require("socket.io")(server);
io.on("connection", function(socket)
{
    socket.emit("news", "abcdefg!")
    socket.on("renews", function(data)
    {
        console.log(data)
    });
});

