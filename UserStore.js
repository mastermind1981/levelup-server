var UserStore = function()
{
    this.users = {};
    this.listeners = {};
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

UserStore.prototype.hasUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    return this.users[name] != undefined;
}

UserStore.prototype.addUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    var user = 
    {
        "name": name,
        "lvl": 1, "xp": 0,
        "date": Date.now()
    }

    this.users[name] = user;

    this.trigger("add user", user);
    return user;
}

UserStore.prototype.untzUser = function(name)
{
    if(!name)
    {
        throw new Error("Invalid Name")
    }

    var user = this.getUser(name);

    user.xp += 1;
    if(user.xp >= 10)
    {
        user.lvl += 1;
        user.xp = 0;
    }

    user.date = Date.now();

    this.trigger("untz user", user);
    return user;
}

UserStore.prototype.nukeUsers = function()
{
    this.users = {};

    this.trigger("nuke users", this.users);
    return this.users;
}

UserStore.prototype.trigger = function(action, data)
{
    if(this.listeners[action])
    {
        for(var index in this.listeners[action])
        {
            this.listeners[action][index](data);
        }
    }
}

UserStore.prototype.on = function(action, listener)
{
    if(!this.listeners[action])
    {
        this.listeners[action] = [];
    }

    this.listeners[action].push(listener);
}

module.exports = UserStore;
