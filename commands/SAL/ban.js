const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const color = require("../../config/color.json")
const moment = require("moment")

module.exports = {
    name: "ban",
    category: "SAL",
    description: "Defines a global San Andreas Life Ban.",
    usage: "+ban <@user> <@reason>",
    run: async (client, message, args) => {

        message.delete()

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const loggingChannel = message.guild.channels.cache.get("902109995418677309")

        if (!loggingChannel)
            return message.channel.send(`<:ERROR:902109440365445140> -> loggingChannel with id: 902109995418677309 does not exist.`)

        if (!mentionedUser)
            return message.channel.send(`<:ERROR:902109440365445140> -> You are required to mention an member or use their ID.`)

        if (message.author.id === "871877975346405388") {

            const embed = new MessageEmbed()
                .setTitle(`Databse | User Ban`)
                .setColor(color.red)
                .setThumbnail(mentionedUser.user.displayAvatarURL())
                .setDescription(`
**Staff Member**
User: <@!${message.author.id}>
Name: ${message.author.tag}
ID: ${message.author.id}

**Banned Member**
User: <@!${mentionedUser.user.id}>
Name:  ${mentionedUser.user.tag}
ID: ${mentionedUser.user.id}

**Other Information**
Ban Date: ${moment().utcOffset(-0).format("dddd, MMMM Do YYYY, h:mm a")}

Reason:
${args.slice(" ").join(1)}
            `)
                .setFooter(mentionedUser.user.tag, mentionedUser.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
            const logEmbed = new MessageEmbed()
                .setTitle(`Databse | User Ban`)
                .setColor(color.red)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
**Staff Member**
User: <@!${message.author.id}>
Name: ${message.author.tag}
ID: ${message.author.id}

**Banned Member**
User: <@!${mentionedUser.user.id}>
Name:  ${mentionedUser.user.tag}
ID: ${mentionedUser.user.id}

**Other Information**
Ban Date: ${moment().utcOffset(-0).format("dddd, MMMM Do YYYY, h:mm a")}

Reason:
${args.slice(1).join(" ")}
                `)
                .setFooter(mentionedUser.user.tag, mentionedUser.user.displayAvatarURL())
                .setTimestamp()
            loggingChannel.send(logEmbed)

            await db.set(`profile.user.ban.${mentionedUser}`, "<:ACTIVE:902109440017317929>")
            await mentionedUser.ban({
                reason: `${args.slice(1).join(" ")}`
            })

        } else {
            message.channel.send(`<:ERROR:902109440365445140> -> <@!${message.author.id}> You can not use this command!`)
        }
    }
}