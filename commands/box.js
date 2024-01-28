const { SlashCommandBuilder } = require('discord.js');
const { displayBox } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('box')
		.setDescription('Look at a box!')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username of the box you want to check')
				.setRequired(false)),
		
						
	async execute(interaction) {
		await interaction.deferReply();
		var username = interaction.options.getString('username');
		if (username == null) {
			username = interaction.user.username;
		}
			userstring = username.toString();
			console.log("username is" + userstring)
			var boxEmbed = displayBox(userstring,"1");
			if(boxEmbed)
			{
				await interaction.followUp(boxEmbed)
			}
			else
			{
				await interaction.followUp("No file found for you")
			}
	}
};



