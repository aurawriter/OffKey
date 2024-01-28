// JavaScript source code

const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gainitem')
		.setDescription('Counting...'),
	async execute(interaction) {
		interaction.reply("/item-give member:@SleepyKittyAura#8541 item:Poke Ball");
	},
};
