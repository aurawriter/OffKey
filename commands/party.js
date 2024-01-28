const { SlashCommandBuilder } = require('discord.js');
const { displayParty } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('party')
		.setDescription('Look at your current party!')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The username of the party you want to check')
				.setRequired(false)),
		
						
	async execute(interaction) {
		await interaction.deferReply();	
		var username = interaction.options.getString('username');
		if (username == null) {
			username = interaction.user.username;
		}
			userstring = username.toString();
			var partyEmbed = displayParty(userstring);
			if(partyEmbed)
			{
				await interaction.followUp(partyEmbed)
			}
			else
			{
				await interaction.followUp("No file found for " + username);
			}
	}
};



