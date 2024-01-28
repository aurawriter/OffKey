	const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Sends a button'),
	async execute(interaction) 
	{const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });
	},
};
