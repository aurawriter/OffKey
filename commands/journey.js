const { Client, SlashCommandBuilder, ActionRowBuilder,ButtonBuilder,ButtonStyle, Events, EmbedBuilder, StringSelectMenuBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('journey')
		.setDescription('Begin a journey through the specified location!')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you would like to journey through!')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('badges')
				.setDescription('The number of badges you have collected!')
				.setRequired(true)),
	async execute(interaction) {
		interaction.deferReply();
		const thelocation = interaction.options.getString('location');
		const badges = interaction.options.getString('badges');
		const channel = interaction.channel;
		var locationString = './Functions/Locations/Routes/' + thelocation + ('.json');
		var locationJSON = require(locationString);
		const threadName = interaction.user.username + "'s Journey: " + locationJSON.locationName;
		const newThread = await channel.threads.create({
			name: threadName,
			autoArchiveDuration: 60,
			reason: "Keep journeys seperate",
		});
		var currentSuccesses = "0";
		var locationDescription = locationJSON.locationDescription.toString()
		newThread.members.add(interaction.user.id);
		newThread.members.add('403812429185810432')
		newThread.members.add('232689259902009355')
		const journeyEmbed = new EmbedBuilder()
			.setTitle(locationJSON.locationName)
			.setColor(locationJSON.locationColor)
			.setDescription(locationDescription)
			.setAuthor({name:thelocation})
			.setFooter({text:badges})
		const SelectBeginning = new StringSelectMenuBuilder()
				.setCustomId('beginningselect')
				.setPlaceholder('Select where you are starting, and where you are going')
				.setMinValues(2)
				.setMaxValues(2);
			
		for(var x = 0;x<locationJSON.connections.length;x++)
		{
			SelectBeginning.addOptions(
			{
				label: locationJSON.connections[x],
				description: "This is one of the places this route connects to",
				value: locationJSON.connections[x]
			});
		}
		const SelectionMenu1 = new ActionRowBuilder().addComponents(SelectBeginning);
		const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Start Journey!')
					.setStyle(ButtonStyle.Primary),
					);
		
		await newThread.send({embeds:[journeyEmbed],components:[SelectionMenu1]});
		interaction.followUp("Creating a thread...");
		

	},
};




