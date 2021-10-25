module.exports = {
	name: "join",
	description: "Simulates a join", 
	aliases: ["adduser"],
	usage: "prefix.join",
	run: (client, message, args) => {
		
		message.delete()

		client.emit('guildMemberAdd', message.member)

	}
}