const { SlashCommandBuilder , PermissionFlagsBits } = require('discord.js');
const { reputationset } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('reputationset')
		.setDescription('Add reputation to factions')
		.addStringOption(option => 
			option.setName('faction')
				.setDescription('The faction you would like to use')
				.setRequired(true))	
		.addStringOption(option => 
			option.setName('amount')
				.setDescription('The amount to set the faction reputation to')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),				
	async execute(interaction) {
			var factionString = interaction.options.getString('faction');
			var amountString = interaction.options.getString('amount');
			var result = reputationset(factionString,amountString)
			interaction.reply(result);
	}
};



