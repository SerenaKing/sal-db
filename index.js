const { Client, Collection, MessageEmbed } = require("discord.js")

const fs = require("fs")
const ms = require('ms')

const quickdb = require("quick.db")

const chalk = require("chalk")

const { prefix } = require("./config/config.json")
const { token } = require("./config/token.json")

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", () => {

    client.user.setPresence({
		status: "idle",
		activity: { 
			name: "[SAL] Database",
			type: "WATCHING"
		}
	})

    setTimeout(async function () {
        console.log(chalk.white(`[${chalk.green(`INFO`)}${chalk.white(`] - Connecting...`)}`));
    }, ms('1s'));
    setTimeout(async function () {
        console.log(chalk.white(`[${chalk.green(`INFO`)}${chalk.white(`] - Logged in as: ${client.user.tag}`)}`));
    }, ms('3s'));
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);

});

client.on("guildMemberAdd", async (member) => {

    const color = require("./config/color.json")

    if (member.guild.id) {
        const embed = new MessageEmbed()
            .setTitle(`San Andreas Life Database | Entry`)
            .setColor(color.green)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`
Welcome to **San Andreas Life**

You have joined the main server officially becoming a member of our community. There are somethings that you should know.
We log our members data! This might sound scary but it really isn't at all.
So you might be wondering what actually is being logged? Well here is your answer!

**User Information**
- Username
- User ID
- Avatar

**Profile Information**
- Ranks
- Bans
- Kicks
- Mutes

If you at any time feel like more data is being logged then is being shown in this message then you could request a data insight.
Keep in mind it may take up to 24 hours for a data-insight to be viewed by you.

- Regards,
San Andreas Life AI
            `)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        member.send(embed)
    }

    await quickdb.set(`profile.rank.member.${member.id}`, "<:CHECK:902109440319291432>")
})

client.login(token);