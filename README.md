# LevelUp Server #

LevelUp is a platform to encourage exercise through gamification. This is the server that supports the operations of the applications.

## Documentation ##

#### Untz a User ####

"Untzing" a user will increment the ``xp``. If the ``xp`` is big enough, than the  ``lvl`` is incremented as well.

Request:

    GET /untz/[NAME]
 
Response:

    {
        "name": "Hazel Ernst",
        "lvl": 10,
        "xp": 5
    }

## Operation ##

#### Installing ####

Install [node](http://www.nodejs.org) on your system.

    $ sudo apt-get install nodejs

Download the dependencies for the project through [npm](https://www.npmjs.com), listed in ``package.json``.

    $ npm install

Configure some tools for building and testing the project, such as [forever](https://github.com/foreverjs/forever) and [jasmine](http://jasmine.github.io/).

    $ npm install forever -g
    $ npm install jasmine-node -g

#### Executing ####

Execute the code from ``server.js``.

    node server.js

You can also run the code in the background.

    $ forever start server.js
    
    OR
    
    $ npm start

#### Testing ####

Test the code from the ``specs``.

    jasmine-node specs
    
    OR
    
    npm test
