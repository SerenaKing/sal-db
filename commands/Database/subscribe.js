const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const colour = require("../../config/color.json")

module.exports = {
    name: "subscribe",
    category: "Database",
    description: "Add a email to the database",
    aliases: ["sub"],
    usage: "+subscribe <email>",
    run: async (client, message, args) => {
        message.delete()
         
        if (args < 1) {
            return message.channel.send(`<@!${message.author.id}> - You didn't input any email...`)
        }

        const loggingChannel = message.guild.channels.cache.get("907147260066947093")

        const dmEmbed = new MessageEmbed()
            .setTitle(`San Andreas Life | Subscription`)
            .setColor(colour.green)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
As of now you can only "generally" subscribe to San Andreas Life. 
That means that any and all emails directed towards the general public will be received in your inbox.
This is now in the future we aim for customization towards all email addresses.

You entered: ${args.slice(" ").join(1)}
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        const registerEmbed = new MessageEmbed()
            .setTitle(`San Andreas Life | Subscription`)
            .setColor(colour.green)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
As of now you can only "generally" subscribe to San Andreas Life. 
That means that any and all emails directed towards the general public will be received in your inbox.
This is now in the future we aim for customization towards all email addresses.

You entered: **HIDDEN**
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()

            const dbLog = new MessageEmbed()
                .setTitle("San Andreas Life | Email Logging")
                .setColor(colour.green)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
Member: ${message.author.tag}
entered: ${args.slice(" ").join(1)}
                `)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()

            await db.set(`profile.user.email.${message.author.id}`, `${args.slice(" ").join(1)}`)

            message.author.send(dmEmbed)
                .then(message.channel.send(registerEmbed)
                    .then(loggingChannel.send(dbLog)))
    }
}