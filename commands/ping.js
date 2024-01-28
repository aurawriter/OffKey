const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pinging...'),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(4000);
		await interaction.editReply('Pong!');
	},
};