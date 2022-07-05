# ROBLOX Mongoose Datastore

> Made by Caallum

## Important note: I haven't tested it, so there is a very good chance there is a couple bugs.

## Setting up

This is extremely easy, just copy `lua/RobloxScript.lua` into a module script in your game, fill in the variable at the top called `DatastoreURL` then that file is good to go!

For the server, simply go into `lib/MongooseHandler.js` and near the top, edit the variable `url` to contain your mongodb url. Note, this project normally runs on `PORT 3021`, to change that, go itno `lib/index.js` and near the top, edit the variable called `PORT` to contain whatever port you desire. 

After this, simply run `npm i` in your console, then run `npm start` and your server should be online!