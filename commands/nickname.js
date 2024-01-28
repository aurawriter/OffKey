const { SlashCommandBuilder } = require('discord.js');
const { nickname } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('nickname')
		.setDescription('Name a pokemon!')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the pokemon you are trying to rename')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('nickname')
				.setDescription('The nickname you want to give the pokemon')
				.setRequired(true)),			
	async execute(interaction)
	{
		await interaction.deferReply();
		var username = interaction.user.username;
		var userstring = username.toString();
		const pokemonIdstring = interaction.options.getString('pokemonid');
		const nicknameString = interaction.options.getString('nickname');

		var message = nickname(userstring,pokemonIdstring,nicknameString);
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



