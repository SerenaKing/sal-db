const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const colour = require("../../config/color.json")

module.exports = {
    name: "addBadge",
    category: "Owner",
    description: "Add a badge to a mentioned user",
    aliases: ["badgeadd", "badd"],
    usage: "+addBadge <@user> <BadgeTag>",
    run: async (client, message, args) => {
        message.delete()

        const mentionedUser = message.mentions.members.first()

        const loggingChannel = message.guild.channels.cache.get("906201702649200671")

        const msgEmbed = new MessageEmbed()
            .setTitle("San Andreas Life | Badge Added")
            .setColor(colour.green)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
Database Member: <@!${message.author.id}>
Badge: ${args[1]}
Member: <@!${mentionedUser.user.id}>
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()

        const loggingEmbed = new MessageEmbed()
            .setTitle("San Andreas Life | Badge Added Logs")
            .setColor(colour.orange)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
Database Member: <@!${message.author.id}>
Badge: ${args[1]}
Member: <@!${mentionedUser.user.id}>
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()

        const failEmbed = new MessageEmbed()
            .setTitle("San Andreas Life | Badge System FAILED")
            .setColor(colour.red)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
The system has failed. Make sure that you mentioned a user by @ / ID & That the name of the badge is correct.
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()

        let badge = (args[1])

        if (badge == "MediaMember") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.media.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else if (badge == "Developer") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.dev.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else if (badge == "Staff") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.staff.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else if (badge == "DirectorOfStaff") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.dos.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else if (badge == "Management") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.man.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else if (badge == "Director") {
            message.channel.send(msgEmbed)
            await db.set(`profile.rank.dir.${mentionedUser.user.id}`, `<:CHECK:902121535869976596>`)
            loggingChannel.send(loggingEmbed)
        } else {
            message.channel.send(failEmbed)
        }
    }
}