const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN =MTQ5MzM2NTQxNjk0MzQyMzQ5OQ.GUwdlO.Aw_skw5rTfMcjJZJR7sp2IPCclGBTVFKxWirI0;
const OWNER_ID = 1364619125422293113;

client.on("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

// Auto role
client.on("guildMemberAdd", member => {
  let role = member.guild.roles.cache.find(r => r.name === "Member");
  if (role) member.roles.add(role);
});

// Commands
client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith("!")) return;

  const args = msg.content.split(" ");
  const cmd = args[0];

  // Owner only
  if (msg.author.id !== OWNER_ID) return;

  // WARN
  if (cmd === "!warn") {
    let user = msg.mentions.members.first();
    if (!user) return msg.reply("User mention kar");

    msg.channel.send(`${user.user.tag} ko warn diya ⚠️`);
  }

  // KICK
  if (cmd === "!kick") {
    let user = msg.mentions.members.first();
    if (!user) return msg.reply("User mention kar");

    await user.kick();
    msg.channel.send(`${user.user.tag} ko kick kiya 🚪`);
  }

  // BAN
  if (cmd === "!ban") {
    let user = msg.mentions.members.first();
    if (!user) return msg.reply("User mention kar");

    await user.ban();
    msg.channel.send(`${user.user.tag} ko ban kiya 🔨`);
  }

  // ROLE
  if (cmd === "!role") {
    let user = msg.mentions.members.first();
    let roleName = args.slice(2).join(" ");
    let role = msg.guild.roles.cache.find(r => r.name === roleName);

    if (role) {
      user.roles.add(role);
      msg.channel.send("Role add ho gaya ✅");
    }
  }
});

client.login(TOKEN);
client.on("error", console.error);

process.on("unhandledRejection", error => {
  console.error("Error:", error);
});
