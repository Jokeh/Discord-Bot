const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) =>{
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("this is the user's info!")
    .setColor("#4834d4")
    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`, true)
    .addField("ID", message.author.id, true)
    .addField("Created At", message.author.createdat, true)
    .setThumbnail(message.author.avatarURL);

    message.channel.sendEmbed(embed);
}

module.exports.help = {
  name: "userinfo"
}
