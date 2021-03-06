//////////////
//Importing//
////////////

var fs = require("fs");
var http = require("http");
var marked = require("marked");
var express = require("express");
var socketio = require("socket.io");

var UserStore = require("./UserStore.js");

/////////////////
//Initializing//
///////////////

var MyUsers = new UserStore();

////////////
//Routing//
//////////

var application = express();

application["use"](express.static("./static"));

application["get"]("/help", function(request, response)
{
    fs.readFile("README.md", function(error, markdown)
    {
        markup = marked(markdown.toString());
        response.send(markup);
    });
});

application["get"]("/users", function(request, response)
{
    var users = MyUsers.getAllUsers();
    response.send(users);
});

application["get"]("/users/:name", function(request, response)
{
    var user = MyUsers.getUser(request.params.name);
    response.send(user);
});

application["get"]("/users/:name/untz", function(request, response)
{
    var user = MyUsers.untzUser(request.params.name);
    response.send(user);
});

application["get"]("/nuke", function(request, response)
{
    var users = MyUsers.nukeUsers();
    response.send(users)
});

application["all"]("/*", function(request, response)
{
    response.status(404).send("..what?");
});

////////////
//Serving//
//////////

var server = http.Server(application);
server.listen(process.env.PORT || 80, function()
{
    console.log("LevelUp is at " + (process.env.PORT || 80));
});

//////////////
//Streaming//
////////////

var io = socketio(server);
io.on("connection", function(socket)
{
    var users = MyUsers.getAllUsers()
    for(var name in users)
    {
        socket.emit("add user", users[name]);
    }

    MyUsers.on("add user", function(user)
    {
        socket.emit("add user", user);
    });

    MyUsers.on("untz user", function(user)
    {
        socket.emit("untz user", user);
    });

    MyUsers.on("nuke users", function()
    {
        socket.emit("nuke users");
    });
});
