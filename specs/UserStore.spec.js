var UserStore = require("../UserStore.js");
var MyUsers = new UserStore();

describe("UserStore", function()
{
    it("can add a user", function()
    {
        expect(MyUsers.addUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 0
        });
    });
    
    it("can get a user", function()
    {
        expect(MyUsers.getUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 0
        });
    });
    
    it("can check if a user exists", function()
    {
        expect(MyUsers.hasUser("andrew")).toEqual(true);
        expect(MyUsers.hasUser("joey")).toEqual(false);
    });

    it("can add a user if it doesn't exist", function()
    {
        expect(MyUsers.getUser("joey")).toEqual({
            "name": "joey", "lvl": 1, "xp": 0
        });
    });
    
    it("can get all users", function()
    {
        expect(MyUsers.getAllUsers()).toEqual({
            "andrew": {"name": "andrew", "lvl": 1, "xp": 0},
            "joey": {"name": "joey", "lvl": 1, "xp": 0}
        });
    });

    it("can untz a user", function()
    {
        expect(MyUsers.untzUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 1
        });
    });

    it("can untz a user", function()
    {
        for(var i = 1; i <= 15; i++)
        {
            expect(MyUsers.untzUser("joey")).toEqual({
                "name": "joey",
                "lvl": Math.floor(i / 11) + 1,
                "xp": i % 11
            });
        }
    });

    //todo: remove a user
    //todo: get users when no users
});
