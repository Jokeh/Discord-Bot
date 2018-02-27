const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) =>{
  if(err) console.err(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <=0){
    console.log("No commands to load!");
    return;
  }

  console.log(`loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

  bot.user.setActivity(`!help -- on ${bot.guilds.size} servers`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(link);
  }).catch(err =>{
    console.log(err.stack);
  });
});



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "discord"
});

con.connect(err => {
  if(err) throw err;
  console.log("Connected to database!");
});

function generateXp(){
  let max = 30;
  let min = 10;

  return Math.floor(Math.random() * (max - min + 1)) +10;
}

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity(`!help -- on ${bot.guilds.size} servers`);
  con.query(`INSERT INTO guilds (id, name) VALUES ('${guild.id}', '${guild.name}')`);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`!help -- on ${bot.guilds.size} servers`);
    con.query(`DELETE FROM guilds WHERE id = '${guild.id}'`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) =>{
    if(err) throw err;

    let sql;

    if(rows[0].guild !== message.guild.id){
      sql = `INSERT INTO xp (id, xp, guild) VALUES ('${message.author.id}', ${generateXp()}, '${message.guild.id}')`;
    }else{
      let xp = rows[0].xp;
      sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
    }

    con.query(sql);
  })

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args, con);
});

bot.login(botSettings.token);
