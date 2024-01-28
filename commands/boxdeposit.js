const { SlashCommandBuilder } = require('discord.js');
const { deposit } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('boxdeposit')
		.setDescription('Desposit a pokemon from your party to the box')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the pokemon you are trying to rename')
				.setRequired(true)),		
	async execute(interaction)
	{
		var username = interaction.user.username;
		var userstring = username.toString();
		const pokemonIdstring = interaction.options.getString('pokemonid');
		await interaction.deferReply();
		var message = deposit(userstring,pokemonIdstring);
			if(message)
			{
				await interaction.followUp(message)
			}
			else
			{
				await interaction.followUp("No file found for you")
			}
	}
};



