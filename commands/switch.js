const { SlashCommandBuilder } = require('discord.js');
const { pokeswitch } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('switch')
		.setDescription('Desposit a pokemon from your party to the box')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the first pokemon')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('pokemon2id')
				.setDescription('The id of the second pokemon')
				.setRequired(true)),	
	
	async execute(interaction)
	{
	
		const pokemon1Idstring = interaction.options.getString('pokemonid');
		const pokemon2Idstring = interaction.options.getString('pokemon2id');
		var userstring = interaction.user.username;
		message = pokeswitch(userstring,pokemon1Idstring,pokemon2Idstring);
		
			if(message)
			{
				interaction.reply(message)
			}
			else
			{
				interaction.reply("No file found for you")
			}
	}
};



