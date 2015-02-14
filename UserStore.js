var UserStore = function()
{
    this.users = {};
}

UserStore.prototype.getUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    if(!this.hasUser(name))
    {
        this.addUser(name)
    }

    return this.users[name];
}

UserStore.prototype.getAllUsers = function()
{
    return this.users;
}

UserStore.prototype.addUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    this.users[name] =
    {
        "name": name,
        "lvl": 1, "xp": 0
    }
}

UserStore.prototype.hasUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    return this.users[name] != undefined;
}

UserStore.prototype.untzUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    var user = this.getUser(name);

    user.xp += 1;
    if(user.xp > 10)
    {
        user.lvl += 1;
        user.xp = 0;
    }

    return user;
}

module.exports = new UserStore();
