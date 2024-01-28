const { SlashCommandBuilder } = require('discord.js');
const { listen } = require('./Functions/functions.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('listen')
		.setDescription('Listen to the locals!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you are in')
				.setRequired(true)),
	async execute(interaction) 
	{
		await interaction.deferReply();
		var locationString = interaction.options.getString('location');
			console.log(locationString);
			if(interaction.member.roles.cache.some(r => r.name === "Restoration Corporation"))
			{
			var listenEmbed = listen(locationString,"Restoration Corporation")
			}
			else if(interaction.member.roles.cache.some(r =>r.name==="Team Knight"))
			{
			var listenEmbed = listen(locationString,"Team Knight")
			}
			
			
			if(listenEmbed)
			{
			await interaction.followUp(listenEmbed);
			}
			else
			{
			await interaction.followUp("No dialogue found...are you sure you're in the right place?");
			}
	}
};



