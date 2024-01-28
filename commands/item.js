const { SlashCommandBuilder } = require('discord.js');
const { itemdrop } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('Test functions!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you are in')
				.setRequired(true)),
	async execute(interaction) 
	{
			var locationString = interaction.options.getString('location');
			console.log(locationString);
			var itemEmbed = itemdrop(locationString)
			if(itemEmbed)
			{
			interaction.reply(itemEmbed);
			}
			else
			{
			interaction.reply("No items found, are you sure you chose the right location?");
			}
	}
};



