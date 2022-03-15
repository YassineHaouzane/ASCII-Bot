# ASCII-Bot

A Discord bot that converts image to ASCII art

## Installation

* Make sure you have nodejs installed.
* Install the dependencies : `npm install`
* Make sure you have your tokens set as environnement variables. 
    * `DISCORD_TOKEN` for the bot token
    * `CLIENT_ID` for the client id of the bot
* Create an .env file containing these tokens in the format `KEY=VALUE`
```
DISCORD_TOKEN=[BOT TOKEN]
CLIENT_ID=[BOT CLIENT ID]
```
* Run the project by running this command : `npm start`

## Docker

* Build the image by running : 
```
docker build -t ascii-bot . -f .\docker\Dockerfile
```
* Run the image : 
```
docker run --env-file .env ascii-bot
```