const { SlashCommandBuilder } = require('discord.js');
const { friendship } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('givefriendship')
		.setDescription('Give a pokemon friendship points')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the pokemon you are trying to give friendship to')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('The amount of friendship gained')
				.setRequired(true)),
	async execute(interaction) {
		var username = interaction.user.username;
		var userstring = username.toString();
		const pokemonIdstring = interaction.options.getString('pokemonid');
		const amountstring = interaction.options.getString('amount');
		await interaction.deferReply();
		message = friendship(userstring, pokemonIdstring, amountstring)
		if(message)
		{
		await interaction.followUp(pokemonIdstring + "gained friendship!");
		}
		else
		{
			await interaction.followUp("Failed to give your Pokemon experience");
		}
	}
};



