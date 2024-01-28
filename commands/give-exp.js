const { SlashCommandBuilder,  PermissionFlagsBits} = require('discord.js');
const { experience ,checkLeveledUp } = require('./Functions/functions.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('givexp')
		.setDescription('Give a player XP')
		.addStringOption(option => 
			option.setName('defeatedlevel')
				.setDescription('The level of the Pokemon defeated')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('username')
				.setDescription('Username of the player to give XP to')
				.setRequired(true))
				.addStringOption(option =>
			option.setName('basexpyield')
				.setDescription('XP Yield of the Pokemon defeated')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),	
		
						
	async execute(interaction) {
		await interaction.deferReply();
	var pokemonLevel = interaction.options.getString('defeatedlevel');
	var BaseEXPYield = interaction.options.getString('basexpyield')
	var username = interaction.options.getString('username')
	var xpgained = experience(pokemonLevel,username,BaseEXPYield);
	try{
				jsonstring = './commands/Functions/Users/' + username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
	}
	catch(err){
		interaction.followUp("That user does not exist");
		return;
	}
				var numberOfPokemon = playerJSON.party.length;
				console.log("Exp Gained" + xpgained);
				var x = 0;
				while(x<playerJSON.party.length)
				{
					var currentXP = parseInt(playerJSON.party[x][6])
					currentXP+=xpgained;
					playerJSON.party[x][6] = currentXP.toString();
					x++;
				}
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr)
				var message =  username + "'s party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(username, y)
				message += leveledUp;
				y++;
				}
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr)
				interaction.followUp(message)
			



	}
};



