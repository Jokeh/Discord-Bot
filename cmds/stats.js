const Discord = module.require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) =>{

  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`  = STATISTICS =
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    • Uptime     :: ${duration}
    • Users      :: ${bot.users.size.toLocaleString()}
    • Servers    :: ${bot.guilds.size.toLocaleString()}
    • Channels   :: ${bot.channels.size.toLocaleString()}`);
}

module.exports.help = {
  name: "botstats"
}
