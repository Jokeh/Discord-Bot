const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) =>{
      var result = Math.floor((Math.random() * 2) + 1);
    	if (result == 1) {
    		bot.reply(message, "The coin landed on heads");
    	} else if (result == 2) {
    		bot.reply(message, "The coin landed on tails");
    	}
}

module.exports.help = {
  name: "flip"
}
