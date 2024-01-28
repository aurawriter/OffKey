const { SlashCommandBuilder } = require('discord.js');
const { info } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokeinfo')
		.setDescription('Find information on a specific Pokemon')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the pokemon you are trying to rename')
				.setRequired(true))		,
	async execute(interaction)
	{
		await interaction.deferReply();
		var username = interaction.user.username;
		var userstring = username.toString();
		const pokemonIdstring = interaction.options.getString('pokemonid');
		var message = info(userstring,pokemonIdstring);
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



