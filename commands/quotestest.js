const { SlashCommandBuilder } = require('discord.js');
const { quotetest } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotetest')
		.setDescription('Test jsons!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you are in')
				.setRequired(true)),
		
						
	async execute(interaction) {
			var locationString = interaction.options.getString('location');
			console.log(locationString);
			
			var numberofquotes = quotetest(locationString);
			interaction.reply("There are " + numberofquotes + " in " + locationString);
	}
};



