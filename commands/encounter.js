const { SlashCommandBuilder } = require('discord.js');
const { encounter } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('encounter')
		.setDescription('Test functions!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you are in')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The kind of encounter that is happening')
				.setRequired(true))
				.addStringOption(option =>
			option.setName('badges')
				.setDescription('The number of badges you have')
				.setRequired(true)),
				
				
	async execute(interaction) {
			await interaction.deferReply();
			var locationString = interaction.options.getString('location');
			console.log(locationString);
			var typeString = interaction.options.getString('type');
			console.log(typeString);
			var badgeString = interaction.options.getString('badges');
			var encounterEmbed = encounter(locationString,typeString,badgeString)	
			
			if(encounterEmbed)
			{
			await interaction.followUp(encounterEmbed);
			}
			else
			{
			await interaction.followUp("No Pokemon found, are you sure you chose the right location and type?");
			}
	}
};



