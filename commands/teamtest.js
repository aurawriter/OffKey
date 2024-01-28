const { SlashCommandBuilder } = require('discord.js');
const { teamtest } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('teamtest')
		.setDescription('Test jsons!'),
		
						
	async execute(interaction) {
			teamtest(interaction.user.username);
			interaction.reply("Created a file for you! ...or not this is a test.");
	}
};



