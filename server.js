var express = require("express");

var application = express();

application.get("/", function(request, response)
{
    response.send("Hello World!");
});

application.listen(8080);
