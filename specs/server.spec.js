var frisby = require("frisby");

var port = process.env.PORT || 8080;
var address = process.env.ADDRESS || "http://localhost";
var server = address + ":" + port;

frisby.create("Untz a user")
    .get(server + "/users/hazel/untz")
    .expectJSON({
    	"name": "hazel",
    	"lvl": 1,
        "xp": 1
    })
    .toss();

frisby.create("Untz another user")
    .get(server + "/users/caleb/untz")
    .expectJSON({
        "name": "caleb",
        "lvl": 1,
        "xp": 1
    })
    .toss();

frisby.create("Untz a user again")
    .get(server + "/users/hazel/untz")
    .expectJSON({
        "name": "hazel",
        "lvl": 1,
        "xp": 2
    })
    .toss();

frisby.create("Get a user")
    .get(server + "/users/hazel")
    .expectJSON({
        "name": "hazel",
        "lvl": 1,
        "xp": 2
    })
    .toss();

frisby.create("Get all users")
    .get(server + "/users")
    .expectJSON({
        "hazel": {
            "name": "hazel",
            "lvl": 1,
            "xp": 2
        },
        "caleb": {
            "name": "caleb",
            "lvl": 1,
            "xp": 1
        }
    })
    .toss();
