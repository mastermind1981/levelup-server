var UserStore = require("../UserStore.js");
var MyUsers = new UserStore();

describe("UserStore", function()
{
    beforeEach(function()
    {
        spyOn(Date, "now").andReturn(Date.now())
    })

    it("can add a user", function()
    {
        expect(MyUsers.addUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 0, "date": Date.now()
        });
    });
    
    it("can get a user", function()
    {
        expect(MyUsers.getUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 0, "date": Date.now()
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
            "name": "joey", "lvl": 1, "xp": 0, "date": Date.now()
        });
    });
    
    it("can get all users", function()
    {
        expect(MyUsers.getAllUsers()).toEqual({
            "andrew": {"name": "andrew", "lvl": 1, "xp": 0, "date": Date.now()},
            "joey": {"name": "joey", "lvl": 1, "xp": 0, "date": Date.now()}
        });
    });

    it("can untz a user", function()
    {
        expect(MyUsers.untzUser("andrew")).toEqual({
            "name": "andrew", "lvl": 1, "xp": 1, "date": Date.now()
        });
    });

    it("can untz a user", function()
    {
        for(var i = 1; i <= 15; i++)
        {
            expect(MyUsers.untzUser("joey")).toEqual({
                "name": "joey",
                "lvl": Math.floor(i / 11) + 1,
                "xp": i % 11,
                "date": Date.now()
            });
        }
    });

    it("can nuke all the users", function()
    {
        expect(MyUsers.nukeUsers()).toEqual({});
    });

    it("can't except methods without arguments", function()
    {
        expect(MyUsers.addUser).toThrow(new Error("Invalid Name"));
        expect(MyUsers.getUser).toThrow(new Error("Invalid Name"));
        expect(MyUsers.hasUser).toThrow(new Error("Invalid Name"));
        expect(MyUsers.untzUser).toThrow(new Error("Invalid Name"));
    });
});
