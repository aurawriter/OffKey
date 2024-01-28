const { SlashCommandBuilder } = require('discord.js');
const KNIGHTROLE = '974848876706164766';
	const CORPROLE = '974846918956052580';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('factiontest')
		.setDescription('Test faction checking!'),
	async execute(interaction) 
	{
		console.log(interaction.member.roles);
		if(interaction.member.roles.cache.some(r => r.name === "Restoration Corporation"))
		{
			interaction.reply("You are in Restoration Corporation")
		}
		else if(interaction.member.roles.cache.some(r =>r.name==="Team Knight"))
		{
			interaction.reply("You are in Team Knight!")
		}
		else
		{
			interaction.reply("You're either in neither team or Aura messed up her coding");
		}
	}
};



