const  { clientId, guildId, token } = require('./config_local');

module.exports = {
    "clientId": process.env.CLIENT_ID || clientId ,
	"guildId": process.env.GUILD_ID || guildId,
    "token": process.env.DISCORD_TOKEN || token 
}

