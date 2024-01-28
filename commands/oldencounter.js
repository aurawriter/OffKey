const { SlashCommandBuilder } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const pokemon = require('./pokemon.json');
const fomelhautForest =[pokemon.fomelhautForestCommon,pokemon.fomelhautForestUncommon,pokemon.fomelhautForestRare,pokemon.fomelhautForestVeryRare,pokemon.fomelhautForestUltraRare];
const boletaBog = [pokemon.boletaBogCommon,pokemon.boletaBogUncommon,pokemon.boletaBogRare,pokemon.boletaBogVeryRare,pokemon.boletaBogUltraRare];
const locations = [boletaBog,fomelhautForest];
const locationNames = ["boletaBog","fomelhautForest"];
const typeColors = ['#E53831','#30CCFD','#784C7D','#93601F','#DE8A16','#A3A3A5','#6593B5','#6E3DBD','#399A27','#DF77DA','#5B73DD','#EB4377','#A4A060','#FFC300','#41A1EB','#7FBEE1','#ABBF08','#50413E'];
const types = ["Fire","Ice","Ghost","Ground","Fighting","Normal","Steel","Poison","Grass","Fairy","Dragon","Psychic","Rock","Electric","Water","Flying","Bug","Dark"];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oldencounter')
		.setDescription('Generates a Pokemon')
		.addStringOption(option => 
			option.setName('location')
				.setDescription('The location you would like to encounter a Pokemon in!')
				.setRequired(true)),
	async execute(interaction) {
		const location = interaction.options.getString('location');
		var encounterLocation = [];
		var x = 0;
		var locationFound = false;
		while(x<locations.length && !locationFound)
		{
			if(location===locationNames[x])
			{
				encounterLocation=locations[x];
				locationFound = true;
			}
			x++;
		}
		if(!locationFound)
		{
			await interaction.reply('That location does not exist, please try again!');
		}
		else
		{
			var rarityPool =0;
			var listEmpty = true;
			while(listEmpty)
			{
				var percent=Math.floor(Math.random()*100)+1;
				if(percent<=40)
				{
					rarityPool=0;
					console.log("Common!");
				}
				if(percent>40 & percent<70)
				{
					rarityPool=1;
					console.log("Uncommon!");
				}
				if(percent>70 & percent<85)
				{
					rarityPool=2;
					console.log("Rare!");
				}
				if(percent>85 & percent<95)
				{
					rarityPool =3;
					console.log("Very rare!");
				}
				if(percent>95)
				{
					rarityPool = 4;
					console.log("Ultra rare!");
				}
				if(encounterLocation[rarityPool].length!=0)
				{
					listEmpty = false;
				}
			}
			console.log(rarityPool);
			var pokeNumber = Math.floor(Math.random()*encounterLocation[rarityPool].length);
			var pokemonSpawned = encounterLocation[rarityPool][pokeNumber];
			var pokemonName = pokemonSpawned[0];
			var pokedexNumber = pokemonSpawned[1];
			var pokemonCategory = pokemonSpawned[2];
			var firstType = pokemonSpawned[3];
			var colorIndex = '#FF0000';
			for(var x = 0; x< types.length; x++)
			{
				if(firstType === types[x])
				{
					colorIndex = typeColors[x]
				}
			}
			var secondType = pokemonSpawned[4];
			var firstAbility = pokemonSpawned[5];
			var secondAbility = pokemonSpawned[6];
			var hiddenAbility = pokemonSpawned[7];
			var maleRatio = parseInt(pokemonSpawned[8])*10;
			var femaleRatio = parseInt(pokemonSpawned[9])*10;
			var minLevel = parseInt(pokemonSpawned[10]);
			var maxLevel = parseInt(pokemonSpawned[11]);
			var evYield = pokemonSpawned[12];
			var timidChance = parseInt(pokemonSpawned[13]);
			var neutralChance = parseInt(pokemonSpawned[14]);
			var aggressiveChance = pokemonSpawned[15];
			var gender = "";
			var pokemonLevel = Math.floor(Math.random()*(maxLevel-minLevel+1))+minLevel
			var levelString = pokemonLevel.toString();
			console.log(pokemonLevel);
			var genderChance = Math.floor(Math.random()*1000) + 1;
			var pokemonAbility = "NA";
			if(maleRatio==0 & femaleRatio ==0)
			{
				gender = "Genderless";
			}
			else if(genderChance < maleRatio)
			{
				gender = "Male";
			}
			else
			{
				gender = "Female";
			}
			while(pokemonAbility==="NA")
			{
				var abilityChance = Math.floor(Math.random()*100)+1;
				if(abilityChance<=45)
				{
					pokemonAbility = firstAbility;
				}
				else if(abilityChance<=90 & abilityChance>45)
				{
					pokemonAbility = secondAbility;
				}
				else
				{
					pokemonAbility = hiddenAbility;
				}
				console.log(pokemonAbility);
			}
			var behaviorChance = Math.floor(Math.random()*100)+1;
			var behavior = ""
			if(behaviorChance<=timidChance)
			{
				behavior = "Timid";
			}
			else if(behaviorChance<=timidChance+neutralChance & behaviorChance > timidChance)
			{
				behavior = "Neutral";
			}
			else
			{
				behavior = "Aggressive";
			}
			const pokemonImage = './WildPokemon/' + pokedexNumber + pokemonName+'.png'
			
			console.log(pokemonImage);
				const pokemonSpawnedEmbed = new EmbedBuilder()
				.setTitle('#'+ pokedexNumber + ' ' + pokemonName);
				const pokemonFile = new AttachmentBuilder(pokemonImage,{name: 'pokemon.png'});
				pokemonSpawnedEmbed.setImage('attachment://pokemon.png')
				.setDescription(pokemonCategory + ' Pokémon')
				.setColor(colorIndex)
				.setAuthor({name:'A wild Pokémon appeared!'})
				.addFields(
				{name:'Gender',value: gender},
				{name:'Level',value: levelString},	
				{name:'Ability',value: pokemonAbility},
				{name:'EV Yield',value: evYield},
				);

				if(behavior === "Timid")
				{
					pokemonSpawnedEmbed.setFooter({text:'The Pokémon seems scared of you!'});
				}
				else if(behavior === "Neutral")
				{
					pokemonSpawnedEmbed.setFooter({text:'The Pokémon seems to not mind your presence!'});
				}
				else if(behavior ==="Aggressive")
				{
					pokemonSpawnedEmbed.setFooter({text:'The Pokémon is attacking you!'});
				}
				await interaction.reply({embeds: [pokemonSpawnedEmbed],files:[pokemonFile]});
		}

		
	},
};