const { SlashCommandBuilder } = require('discord.js');
const { withdraw } = require('./Functions/functions.js');
const fs = require('node:fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('boxwithdraw')
		.setDescription('Desposit a pokemon from your party to the box')
		.addStringOption(option =>
			option.setName('pokemonid')
				.setDescription('The id of the pokemon you are trying to rename')
				.setRequired(true)),		
	async execute(interaction)
	{
		var username = interaction.user.username;
		var userstring = username.toString();

		try{
		jsonstring = './commands/Functions/Users/' + username + '.json';
			const data = fs.readFileSync(jsonstring,
					{ encoding: 'utf8', flag: 'r' });
			playerJSON = JSON.parse(data)
		}
		catch(err)
		{
			interaction.reply("No file found for you")
		}

		const pokemonIdstring = interaction.options.getString('pokemonid');
		await interaction.deferReply();
		if(playerJSON.party.length<6)
		{
		message = withdraw(userstring,pokemonIdstring);
		}
		else
		{
		message = "Your party is full! Try depositing a Pokemon first!"
		}

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



