const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const color = require("../../config/color.json")

module.exports = {
    name: "profile",
    category: "Database",
    description: "Show your own or a mentioned users profile",
    usage: "+profile (<@user>)",
    run: async (client, message, args) => {
        
        message.delete()

        const mem = message.author
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const banned = db.fetch(`profile.user.ban.${mem.id}`)
        const director = db.fetch(`profile.rank.dir.${mem.id}`)
        const mangement = db.fetch(`profile.rank.man.${mem.id}`)
        const dos = db.fetch(`profile.rank.dos.${mem.id}`)
        const staff = db.fetch(`profile.rank.staff.${mem.id}`)
        const dev = db.fetch(`profile.rank.dev.${mem.id}`)
        const media = db.fetch(`profile.rank.media.${mem.id}`)
        const member = db.fetch(`profile.rank.member.${mem.id}`)

        const main = new Discord.MessageEmbed()
        main.setTitle(`Databse | User Profile`)
        main.setColor(color.blue)
        main.setThumbnail(message.author.displayAvatarURL())
        main.setDescription(`
This is all information that is currently being logged by the San Andreas Life (SAL) Database.
If you feel like more data is being stored then is being displayed you may request a data insight.
        `)
        main.addField(`❯ | Profile Status`,
        `
<:Director:902123697773629490> ❯ SAL Director: ${director || "<:ERROR:902109440365445140>"}
<:MANAGEMENT:902123944130277397> ❯ SAL Management: ${mangement || "<:ERROR:902109440365445140>"}
<:DOS:902123944415461376> ❯ SAL Director Of Staff: ${dos || "<:ERROR:902109440365445140>"}
<:STRAFF:902123944163835936> ❯ SAL Staff: ${staff || "<:ERROR:902109440365445140>"}
<:DEVETEAM:902123241760505866> ❯ SAL Developer: ${dev || "<:ERROR:902109440365445140>"}
<:MEADTEAM:902123241819234324> ❯ SAL Media Member: ${media || "<:ERROR:902109440365445140>"}
<:MEMBER:902123241752105020> ❯ SAL Member: ${member || "<:ERROR:902109440365445140>"}
❯ Banned: ${banned || "<:ERROR:902109440365445140>"}
        `)
        main.setFooter(message.author.tag, message.author.displayAvatarURL())
        main.setTimestamp()

        if (!mentionedMember) return message.channel.send(main)

        const banned1 = db.fetch(`profile.user.ban.${mentionedMember.id}`)
        const director1 = db.fetch(`profile.rank.dir.${mentionedMember.id}`)
        const mangement1 = db.fetch(`profile.rank.man.${mentionedMember.id}`)
        const dos1 = db.fetch(`profile.rank.dos.${mentionedMember.id}`)
        const staff1 = db.fetch(`profile.rank.staff.${mentionedMember.id}`)
        const dev1 = db.fetch(`profile.rank.dev.${mentionedMember.id}`)
        const media1 = db.fetch(`profile.rank.media.${mentionedMember.id}`)
        const member1 = db.fetch(`profile.rank.member.${mentionedMember.id}`)

        const extra = new Discord.MessageEmbed()
        extra.setTitle(`Databse | User Profile`)
        extra.setColor(color.blue)
        extra.setThumbnail(mentionedMember.user.displayAvatarURL())
        extra.setDescription(`
This is all information that is currently being logged by the San Andreas Life (SAL) Database.
If you feel like more data is being stored then is being displayed you may request a data insight.
        `)
        extra.addField(`❯ | Profile Status`,
        `
<:Director:902123697773629490> ❯ SAL Director: ${director1 || "<:ERROR:902109440365445140>"}
<:MANAGEMENT:902123944130277397> ❯ SAL Management: ${mangement1 || "<:ERROR:902109440365445140>"}
<:DOS:902123944415461376> ❯ SAL Director Of Staff: ${dos1 || "<:ERROR:902109440365445140>"}
<:STRAFF:902123944163835936> ❯ SAL Staff: ${staff1 || "<:ERROR:902109440365445140>"}
<:DEVETEAM:902123241760505866> ❯ SAL Developer: ${dev1 || "<:ERROR:902109440365445140>"}
<:MEADTEAM:902123241819234324> ❯ SAL Media Member: ${media1 || "<:ERROR:902109440365445140>"}
<:MEMBER:902123241752105020> ❯ SAL Member: ${member1 || "<:ERROR:902109440365445140>"}
❯ Banned: ${banned1 || "<:ERROR:902109440365445140>"}
        `)
        extra.setFooter(mentionedMember.user.tag, mentionedMember.user.displayAvatarURL())
        extra.setTimestamp()

        if (mentionedMember) return message.channel.send(extra)
    }
}