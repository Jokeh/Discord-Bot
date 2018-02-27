const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) =>{
  message.reply("Things I can do:" +
				"\n\n`!help` - Show's what I can do" +
        "\n\n`=======================Staff Commands=======================`" +
				"\n\n`!addrole <role> <user>` - Add a role to user" +
				"\n\n`!removerole <role> <user>` - Remove a role from user" +
				"\n\n`!parse <2-100>` - Remove amount of messages from channel" +
				"\n\n`!kick <user> <reason>` - Kick a user from server"+
        "\n\n`!ban <user> <reason>` - Ban a user from server"+
				"\n\n`!mute <user> <time (1s/m/h/d/y)>` - Mute user on server"+
        "\n\n`!warn <user> <reason>` - Warn a user" +
				"\n\n`!warnlevel <user>` - Check how many warns a user has" +
        "\n\n`!unmute <user>` - Unmute a user" +
        "\n\n`=======================User  Commands=======================`" +
				"\n\n`!report <user> <reason>` - Report a user to staff" +
				"\n\n`!say <message>` - Make the bot say something" +
				"\n\n`!serverinfo` - Show the server info" +
				"\n\n`!userinfo` - Show your user info" +
				"\n\n`!botinfo` - Show the bot info" +
        "\n\n`!botstats` - Show the bot stats and uptime" +
        "\n\n`!flip` - Flip a coin" +
        "\n\n`!rps <rock/paper/scissors>` - Rock Paper Scissors"
      );
}

module.exports.help = {
  name: "help"
}
