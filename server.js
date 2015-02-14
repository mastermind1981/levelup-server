//////////////
//Importing//
////////////

var fs = require("fs");
var http = require("http");
var marked = require("marked");
var express = require("express");
var socketio = require("socket.io");

var UserStore = require("./UserStore.js");

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
    var users = UserStore.getAllUsers();
    console.log(users);
    response.send(users);
});

application["get"]("/users/:name", function(request, response)
{
    var user = UserStore.getUser(request.params.name);
    response.send(user);
});

application["get"]("/users/:name/untz", function(request, response)
{
    var user = UserStore.untzUser(request.params.name);
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

var io = socketio(server);
io.on("connection", function(socket)
{
    for(var name in users)
    {
        socket.emit("add user", users[name]);
    }

    socket.on("add user", function(name, user)
    {
        users[name] = user;
        socket.broadcast.emit("add user", user)
    });
});
