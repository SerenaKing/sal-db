const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const colours = require("../../config/color.json")
const moment = require("moment")

module.exports = {
    name: "inactiveNotice",
    category: "SAL",
    description: "Pushes an inactive notice to members. If they can't be DM'ed an error is thrown.",
    aliases: ["notice"],
    usage: "+notice <@member> <reason>",
    run: async (client, message, args) => {
        
        message.delete()

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const loggingChannel = message.guild.channels.cache.get("907148971296833536")

        if (message.author.id === "871877975346405388") {

            if (!mentionedUser) 
                return message.channel.send(`<@!${message.author.id}> - You didn't mention a member.`)
            
            if (args < 1)
                return message.channel.send(`<@!${message.author.id}> - You didn't provide a reason for the notice.`)

            if (!loggingChannel)
                return message.channel.send(`<@!${message.author.id}> - The logging channel with ID ||907148971296833536|| Doesn't exist.`)

            const dmEmbed = new MessageEmbed()
                .setTitle(`San Andreas Life | Inactive Notice`)
                .setColor(colours.orange)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
Hello, <@!${mentionedUser.user.id}>

You are receiving this message because you have been marked 'inactive'. 
This can be due to many reasons some listed below along with the reason you are marked inactive.

If you can't show any more activity in the next coming 7 days you will receive another 1 *one* message like this.
After that message is received and logged you will be demoted first hand if applicable or put back to recruitment and asked
to re-apply.

**Reasons**
\`\`\`
- Not joining roleplays
- Not talking in chat
- Not joining voice channels
- No logs of joining the server
- No work as department staff
- No work as staff member
\`\`\`

**Your Reason**
\`\`\`
${args.slice(1).join(" ")}
\`\`\`
                `)
                .setFooter(message.author.id, message.author.displayAvatarURL())
                .setTimestamp()
            const failEmbed = new MessageEmbed()
                .setTitle(`San Andreas Life | System Failure`)
                .setColor(colours.red)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
The mentioned member: <@!${mentionedUser.user.id}>

Did not have their DM open for the bot. This means I can not DM this member.
A staff member should take my responsibility.
                `)
                .setFooter(message.author.id, message.author.displayAvatarURL())
                .setTimestamp()
            const sucEmbed = new MessageEmbed()
                .setTitle(`San Andreas Life | Notice Logging`)
                .setColor(colours.green)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
Marked Member: <@!${mentionedUser.user.id}>
Marked by Staff: <@!${message.author.id}>

Time: ${moment().utcOffset(-0).format("dddd, MMMM Do YYYY, h:mm a")}

Reason: 
\`\`\`
${args.slice(1).join(" ")}
\`\`\`
                `)
                .setFooter(message.author.id, message.author.displayAvatarURL())
                .setTimestamp()

            mentionedUser.send(dmEmbed)
                .then(loggingChannel.send(sucEmbed))

        } else {
            message.channel.send(`<@!${message.author.id}> - You don't hace access to this command...`)
        }
    }
}