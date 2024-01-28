const { SlashCommandBuilder } = require('discord.js');
const { trainer } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('trainer')
		.setDescription('Test functions!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you are in')
				.setRequired(true))	
		.addStringOption(option=>
			option.setName('badges')
				.setDescription('The number of badges you have obtained')
				.setRequired(true)),
	async execute(interaction) 
	{
			var locationString = interaction.options.getString('location');
			console.log(locationString);
			var badgeNumber = interaction.options.getString('badges');
			var trainerEmbed = trainer(locationString,badgeNumber)
			if(trainerEmbed)
			{
			interaction.reply(trainerEmbed);
			}
			else
			{
			interaction.reply("No Trainers found, are you sure you chose the right location?");
			}
	}
};



