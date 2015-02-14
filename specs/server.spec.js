var frisby = require("frisby");

var port = process.env.PORT || 8080;
var address = process.env.ADDRESS || "http://localhost";
var server = address + ":" + port;

frisby.create("Untz a user")
    .get(server + "/untz/hazel")
    .expectJSON({
    	"name": "hazel",
    	"lvl": 1, "xp": 1
    })
    .toss();

frisby.create("Untz a user again")
    .get(server + "/untz/hazel")
    .expectJSON({
    	"name": "hazel",
    	"lvl": 1, "xp": 2
    })
    .toss();
