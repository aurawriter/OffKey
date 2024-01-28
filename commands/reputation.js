const { SlashCommandBuilder } = require('discord.js');
const { reputationcheck } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('reputationcheck')
		.setDescription('Check amount of reputation for factions'),				
	async execute(interaction) {
		await interaction.deferReply();
		if (interaction.member.roles.cache.some(r => r.name === "Restoration Corporation")) {
			var reputationstring = reputationcheck("restorationcorp")
		}
		else if (interaction.member.roles.cache.some(r => r.name === "Team Knight")) {
			var reputationstring = reputationcheck("teamknight")
		}
	
			if(reputationstring)
			{
			await interaction.followUp(reputationstring);
			}
			else
			{
			await interaction.followUp("You're not in a faction!");
			}
	}
};



