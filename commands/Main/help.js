const { MessageEmbed } = require("discord.js")
const color = require("../../config/color.json")

module.exports = {
    name: "help",
    category: "main",
    description: "Shows all active and executable commands.",
    usage: "+help",
    run: (client, message, args) => {

        message.delete()

        const embed = new MessageEmbed()
            .setTitle(`Database | Help`)
            .setColor(color.blue)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
**Main Commands**
help - Shows this embed.

**Database Commands**
profile - Check your own or a mentioned users profile.

**SAL Commands**
ban - Bans a user in the databse.
            `)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    }
}