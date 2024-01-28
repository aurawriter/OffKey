const typeColors = ['#E53831','#30CCFD','#784C7D','#93601F','#DE8A16','#A3A3A5','#6593B5','#6E3DBD','#399A27','#DF77DA','#5B73DD','#EB4377','#A4A060','#FFC300','#41A1EB','#7FBEE1','#ABBF08','#50413E'];
const types = ["Fire","Ice","Ghost","Ground","Fighting","Normal","Steel","Poison","Grass","Fairy","Dragon","Psychic","Rock","Electric","Water","Flying","Bug","Dark"];
const {AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require('discord.js');
const fs = require('fs');
var x = 0;

//Test function to test whether or not storing variables in the .js would work between bot resets. The answer was no, and I would need to use a .json
function count()
{
	x++;
	return x;
}

	//Spawns a Pokemon based on the 'encounterLocation' entered, 'type' of encounter specified, and the number of 'badges' the user specifies.
	//The encounterLocation determines which.json to use
	//'type' specifies encounter type like 'land', 'water', 'oldRod', 'goodRod', 'superRod','rockSmash','headbutt','sweetscent', or 'special'
	//badges is how many badges the player's character has, and is used to help scale the Pokemon to their level.
	function encounter(encounterLocation, type, badges)
	{
		try {
		//attempts to find the specified json. If it doesn't exist, returns null, which the slash command uses to reply. This prevents user error from causing the bot to crash
	jsonstring = './commands/Functions/Locations/Routes/' + encounterLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	locationJSON = JSON.parse(data);
	}
	catch(err)
	{
		return null;
		}
	//Randomizes a 'trainerLevel' based on the number of badges input. This is the variable used to scale around.
	var numberofbadges = badges;
	switch(numberofbadges)
	{
		case "0" || "zero":
			//trainerLevel is 5-13
			trainerLevel = Math.floor(Math.random()*8)+5;
			break;
		case "1" || "one":
			//trainerLevel is 9-19
			trainerLevel = Math.floor(Math.random()*10)+9;
			break;
		case "2" || "two":
			//trainerLevel is 17-23
			trainerLevel = Math.floor(Math.random()*6)+17;
			break;
		case "3" || "three":
			//trainerLevel is 21-27
			trainerLevel = Math.floor(Math.random()*6)+21;
			break;
		case "4" || "four":
			//trainerLevel is 25-32
			trainerLevel = Math.floor(Math.random()*7)+25;
			break;
		case "5" || "five":
			//trainerLevel is 30-36
			trainerLevel = Math.floor(Math.random()*6)+30;
			break;
		case "6" || "six":
			//trainerLevel is 34-39
			trainerLevel = Math.floor(Math.random()*5)+34;
			break;
		case "7" || "seven":
			//trainerLevel is 37-45
			trainerLevel = Math.floor(Math.random()*8)+37;
			break;
		case "8" || "eight":
			//trainerLevel is 43-54
			trainerLevel = Math.floor(Math.random()*11)+43;
			break;
		default:
			//if nothing was entered for badges (shouldn't be possible to enter nothing), trainereLevel is randomized between 3-53
			trainerLevel = Math.floor(Math.random()*50)+3;
		}
	//determines which of the pools to pull from
	switch(type)
	{
		case "land": 
			pokemonPools = [locationJSON.landCommon,locationJSON.landUncommon,locationJSON.landRare,locationJSON.landVeryRare,locationJSON.landUltraRare];
			break;
		case "water":
			pokemonPools = [locationJSON.waterCommon,locationJSON.waterUncommon,locationJSON.waterRare,locationJSON.waterVeryRare,locationJSON.waterUltraRare];
			break;
		case "rocksmash":
			pokemonPools = [locationJSON.rocksmashCommon,locationJSON.rocksmashUncommon,locationJSON.rocksmashRare,locationJSON.rocksmashVeryRare,locationJSON.rocksmashUltraRare];
			break;
		case "sweetscent":
			pokemonPools = [locationJSON.sweetscentCommon,locationJSON.sweetscentUncommon,locationJSON.sweetscentRare,locationJSON.sweetscentVeryRare,locationJSON.sweetscentUltraRare];
			break;
		case "headbutt":
			pokemonPools = [locationJSON.headbuttCommon,locationJSON.headbuttUncommon,locationJSON.headbuttRare,locationJSON.headbuttVeryRare,locationJSON.headbuttUltraRare];
			break;
		case "oldrod":
			pokemonPools = [locationJSON.oldrodCommon,locationJSON.oldrodUncommon,locationJSON.oldrodRare,locationJSON.oldrodVeryRare,locationJSON.oldrodUltraRare];
			break;
		case "goodrod":
			pokemonPools = [locationJSON.goodrodCommon,locationJSON.goodrodUncommon,locationJSON.goodrodRare,locationJSON.goodrodVeryRare,locationJSON.goodrodUltraRare];
			break;
		case "superrod":
			pokemonPools = [locationJSON.superrodCommon,locationJSON.superrodUncommon,locationJSON.superrodRare,locationJSON.superrodVeryRare,locationJSON.superrodUltraRare];
			break;
		case "special":
			pokemonPools = [locationJSON.specialCommon,locationJSON.specialUncommon,locationJSON.specialRare,locationJSON.specialVeryRare,locationJSON.specialUltraRare];
			break;
		default:
			pokemonPools = []
		}
	//if the pool has no Pokemon in it, ends the function.
	 if(pokemonPools.length === 0)
	 {
		 return null;
	 }
	 else
	 {
			var rarityPool = 0;
			var rarity = "";
			var listEmpty = true;
			var pokemonFound = false;
		 var attempts = 0;
		 //the code will keep trying until an appropariate pokemon is found
			while(!pokemonFound)
			{
				while(listEmpty)
				{
					//randomizes whether to have a Common,Uncommon,Rare,VeryRare, or Ultra Rare pokemon. If one of these lists is empty, it will just try again until it randomizes a list that isn't empty
					//Common chance: 40%
					//Uncommon chance:30%
					//Rare Chance: 15%
					//Very Rare Chance: 10%
					//Ultra Rare Chance: 5%
				var percent = Math.floor(Math.random()*100)+1
					if(percent<=40)
						{
							rarityPool=0;
							rarity = "Common"
							console.log("Common!");
						}
					if(percent>40 & percent<=70)
						{
							rarityPool=1;
							rarity = "Uncommon"
							console.log("Uncommon!");
						}
					if(percent>70 & percent<=85)
						{
							rarityPool=2;
							rarity = "Rare"
							console.log("Rare!");
						}
					if(percent>85 & percent<=95)
						{
							rarityPool =3;
							rarity = "Very Rare"
							console.log("Very rare!");
						}
					if(percent>95)
						{
							rarityPool = 4;
							rarity = "Ultra Rare"
							console.log("Ultra rare!");
						}
					if(pokemonPools[rarityPool].length!=0)
						{
							listEmpty = false;
						}
				}
				//Chooses a Pokemon from the list. If the Pokemon doesn't have a minimum level that is less than the 'trainerLevel', it tries the whole process again, up to 10,000 times. If after 10,000 times no Pokemon with a minimum level in range is found, it simply settles for one of the Pokemon
				var pokemonNumber = Math.floor(Math.random() * pokemonPools[rarityPool].length);
				var pokemonSpawned = pokemonPools[rarityPool][pokemonNumber];
				var minLevel = parseInt(pokemonSpawned[10]);
				var maxLevel = parseInt(pokemonSpawned[11]);
					if (minLevel <= trainerLevel || attempts > 10000) 
					{
						pokemonFound = true;
						minLevel <= trainerLevel	
					}
					else
					{
					attempts++;
					}
		
			}
			//Used to determine whether or not the Pokemon is shiny. The commented out shinyChance is used to debug Shiny Pokemon
			var shinyChance = Math.floor(Math.random()*200 + 1);
			//var shinyChance = 1;
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
			var evYield = pokemonSpawned[12];
			var timidChance = parseInt(pokemonSpawned[13]);
			var neutralChance = parseInt(pokemonSpawned[14]);
			var aggressiveChance = pokemonSpawned[15];
			var gender = "";
			var pokemonLevel = Math.floor(Math.random()*(maxLevel-minLevel+1))+minLevel
			console.log("Pokemon Level is" + pokemonLevel);
			console.log("Trainer level is" + trainerLevel);
			var levelString = pokemonLevel.toString();
			advantage = trainerLevel-pokemonLevel
			console.log("Advantage is" + advantage);
		 console.log(pokemonLevel);
		 //These variables are used to determine if the pokemon is male or female (genderChance), or if the pokemon is a boss.
			var genderChance = Math.floor(Math.random()*1000) + 1;
			var bossChance = Math.floor(Math.random()*50)+1;
			var boss = false;
			var levelingRate = pokemonSpawned[18];
			var baseExpYield = pokemonSpawned[19];
			natures = ["Hardy","Lonely","Brave","Adamant","Naughty","Bold","Docile","Relaxed","Impish","Lax","Timid","Hasty","Serious","Jolly","Naive","Modest","Mild","Quiet","Bashful","Rash","Calm","Gentle","Sassy","Careful","Quirky"]
			var pokemonNature = natures[Math.floor(Math.random()*natures.length)];
			//Used to decide the Pokemon's Nature
			var pokemonAbility = "NA";
			var pokemonSR = parseFloat(pokemonSpawned[16]);
			console.log("Pokemon SR:"+pokemonSR);
			var pokemonHP = parseInt(pokemonSpawned[17]);
		 console.log("Pokemon HP:" + pokemonHP);
		 //Catch DC ('difficulty check') is how hard it is to catch the Pokemon. It is based on several factors: The Pokemon's "Species Rating" (SR), the Pokemon's level (Divided by 5), and its HP (Divided by 10).
		 var catchDC = Math.round(pokemonSR) + Math.round(pokemonLevel / 5) + Math.round(pokemonHP / 10);
		 //If the pokemonLevel is much higher than the trainerLevel, the catchrate is increased. This will often make it impossible to catch the pokemon if its too strong for you, but not impossible.
			if(pokemonLevel > trainerLevel + 5)
			{
				
			difference = pokemonLevel - trainerLevel
			catchDC + 5;
			catchDC += Math.round(difference/5)
			}
			console.log("Catch Rate:"+ catchDC);
		 var catchDCString = catchDC.toString();
		 //randomize the Pokemon's "individual values". These impact what its stats are.
			var ivString = ""
			for(x=0;x<6;x++)
			{
				iv = Math.floor(Math.random()*31)+1 
				ivString += iv;
				if(x!=5)
				{
					ivString+="/"
				}
		 }
		 //Determines the pokemon's gender, using the genderChance from earlier. It first checks if both ratios are 0, in which case the pokemon has no gender
		 //if genderChance is less than the pokemon's maleRatio, its male. If its greater than, its a female.
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
		 //determines the Pokemon's ability using the abilities from its array. there is a 45% chance to have the first ability, a 45% chance to have the second ability, and a 10% chance to have the hidden ability. If the Pokemon doesn't have a second or hidden ability,
		 //the code will eventually find its way to using the firstAbility.
			abilityFound = false;
			while(!abilityFound)
			{
				var abilityChance = Math.floor(Math.random()*100)+1;
				if(abilityChance<=45)
				{
					pokemonAbility = firstAbility;
					abilityFound = true;
				}
				else if(abilityChance<=90 & abilityChance>45)
				{
					pokemonAbility = secondAbility;
					if(pokemonAbility!="NA")
					{
						abilityFound = true;
					}
				}
				else
				{
					pokemonAbility = ":star::sparkles::star:" + hiddenAbility;
					if(hiddenAbility!="NA")
					{
						abilityFound = true;
					}
				}
				console.log(pokemonAbility);
		 }
		 //behavior used to effect the chances of running from a Wild Pokemon. However we made running a guaranteed chance, so this part of the code is mechanically defunct. 
		 //however it is still here, as it is a nice bit of flavor 
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
		 //begin constructing the embed that will show off the pokemon
			const pokemonSpawnedEmbed = new EmbedBuilder()
			 .setTitle('#' + pokedexNumber + ' ' + pokemonName);
		 //if the shinyChance obtained earlier is 1, it's a shiny. If its a shiny, it can't be a boss.
		 //Bosses can't be caught, so we wouldn't want the players to miss out on a shiny.
				if(shinyChance===1)
				{
					pokemonSpawnedEmbed.setTitle(':star::sparkles::star: #' + pokedexNumber + ' ' + pokemonName);
					pokemonName = 'Shiny'+pokemonName
				}
				else if(bossChance === 1)
				{
				boss = true;
				}
				if(boss)
				{
					pokemonSpawnedEmbed.setTitle(':skull: #' + pokedexNumber + ' ' +pokemonName);
				}
				const pokemonImage = './WildPokemon/' + pokedexNumber + pokemonName+'.png'
				console.log(pokemonImage);
				const pokemonFile = new AttachmentBuilder(pokemonImage,{name: 'pokemon.png'});
				pokemonSpawnedEmbed.setImage('attachment://pokemon.png')
				.setDescription(pokemonCategory + ' Pokémon')
				.setColor(colorIndex)
				.setAuthor({name:'A wild Pokémon appeared!'})
				console.log (encounterLocation);
				console.log(type);
				console.log(rarity);
				pokemonSpawnedEmbed.addFields({name: "Location", value: encounterLocation.toString(),inline:true},{name: "Encounter Type", value: type.toString(),inline:true},{name:"Rarity",value:rarity,inline:true});
				var typeString = firstType;
				if(secondType!="NA")
				{
					typeString += "/"+secondType;
				}
				if(!boss)
				{
					pokemonSpawnedEmbed.addFields({name:'Level',value:levelString,inline:true},{name:'Gender',value:gender, inline: true},{name:'Types',value:typeString, inline:true});	
				}
				else
				{
					pokemonSpawnedEmbed.addFields({name:'Level',value: '?',inline:true},{name:'Gender',value:gender,inline:true},{name:'Types',value: typeString, inline: true});
				}
				pokemonSpawnedEmbed.addFields({name:'Ability',value: pokemonAbility,inline:true},{name:'Pokemon HP',value:pokemonHP.toString(),inline: true},{name:"\u200B",value:"\u200B",inline:true});
				pokemonSpawnedEmbed.addFields({name:'Nature',value: pokemonNature,inline:true},{name:'IVs', value: ivString, inline:true},{name:'EV Yield',value: evYield,inline:true});
				pokemonSpawnedEmbed.addFields({name:'Advantage',value:advantage.toString(),inline:true},{name:'Catching Difficulty',value: catchDCString,inline:true},{name:"\u200B",value:"\u200B",inline:true});
		 if (pokemonSpawned.length == 21) {
			 pokemonSpawnedEmbed.addFields({ name: 'Leveling Rate', value: levelingRate, inline: true }, { name: 'Base EXP Yield', value: baseExpYield, inline: true }, { name: "Base Friendship", value: pokemonSpawned[20], inline: true });
		 }
		 if (pokemonSpawned.length == 20) {
			 pokemonSpawnedEmbed.addFields({ name: 'Leveling Rate', value: levelingRate, inline: true }, { name: 'Base EXP Yield', value: baseExpYield, inline: true }, { name: "Base Friendship", value: "50", inline: true });
		 }
			//if the pokemon is shiny, we're not just pulling from official art
			//So remember to credit artists! <3
				if (shinyChance === 1)
				{
					pokemonSpawnedEmbed.addFields({name: 'Shiny Art Credit', value:'https://tonofdirt726.imgbb.com/'})
				}
				
				//There are Common, Uncomon, Rare, Epic, and Legendary Bosses. This determines how much stronger the Pokemon is than your highest level Pokemon.
				if(boss)
				{
					var bossType = Math.floor(Math.random()*100+1);
					if(bossType<=40)
					{
						//Common Boss: 5 Levels More
						pokemonSpawnedEmbed.setAuthor({name:'A common boss Pokemon has spawned!'});
					}
					if(bossType>40 & bossType<70)
					{
						//Uncommon Boss: 10 levels more
						pokemonSpawnedEmbed.setAuthor({name:'An uncommon boss Pokemon has spawned!'});
					
					}
					if(bossType>70 & bossType<85)
					{
						//Rare Boss: 20 Levels more
						pokemonSpawnedEmbed.setAuthor({name:'A rare boss Pokemon has spawned!'});
					
					}
					if(bossType>85 & bossType<95)
					{
						//Epic Boss: 30 levels more
						pokemonSpawnedEmbed.setAuthor({name:'An epic boss Pokemon has spawned!'});
					
					}
					if(bossType>95)
					{
						//Legendary Boss: 40 Levels more
						pokemonSpawnedEmbed.setAuthor({name:'A legendary boss Pokemon has spawned!'});
					
					}
				}
				if (behavior === "Timid") {
					 pokemonSpawnedEmbed.setFooter({ text: 'The Pokémon seems scared of you!' });
				 }
				else if(behavior === "Neutral")
				{
					pokemonSpawnedEmbed.setFooter({text:'The Pokémon seems to not mind your presence!'});
				}
				else if(behavior ==="Aggressive")
				{
					pokemonSpawnedEmbed.setFooter({text:'The Pokémon is attacking you!'});
				}
				////Creates the buttons used to interact with the PokemonEmbed!
				const PossibleActions = new ActionRowBuilder();
				if(!boss)
				{
				//Can Battle, Run, or Catch any nonboss pokemon
				console.log("It's not a boss, so you can battle,catch, AND run from it'")
				PossibleActions.addComponents(
					new ButtonBuilder()
					.setCustomId('battle')
					.setLabel('Battle!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
					.setCustomId('Run')
					.setLabel('Run')
					.setStyle(ButtonStyle.Danger)
				);
				}
				if(boss)
				{
				//Since these boss battles are run through Pokemon Showdown, there is no point to the 'Battle' button.
				//No one is coming to save you there is only running.
				console.log("It is a boss, so you can only run from it.")
				PossibleActions.addComponents(
					new ButtonBuilder()
					.setCustomId('Run')
					.setLabel('Run')
					.setStyle(ButtonStyle.Danger));
				}
				
			if(!boss)
			{
				//sets up the drop down menu to select a pokeball to use. Each Pokeball describes what it does
				//there was a perfectly usable inventory bot, so inventory functionality is not built into this bot
				//and they must /item use the relevant pokeball using that bot
				const PossiblePokeballs = new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('select')
						.setPlaceholder('Nothing selected')
						.addOptions(
						{
							label:'Unselected',
							description:'Select this to use the same Pokeball twice in a row!',
							value:'unselected'
						},
						{
							label: 'Poke Ball',
							description: '+0 to Capture Roll',
							value: 'Poke Ball',
						},
						
						{
							label: 'Great Ball',
							description: '+5 to Capture Roll',
							value: 'Great Ball',
						},
						{
							label: 'Ultra Ball',
							description: '+10 to Capture Roll',
							value: 'Ultra Ball',
						},
						{
							label: 'Dive Ball',
							description: '+10 to Capture Roll if fishing or underwater',
							value: 'Dive Ball',
						},
						{
							label: 'Dusk Ball',
							description: '+10 to Capture Roll if in a cave',
							value: 'Dusk Ball',
						},
						{
							label: 'Luxury Ball',
							description: '+5 to Capture Roll. Sets Friendship to +1 after catch',
							value: 'Luxury Ball',
						},
						{
							label: 'Nest Ball',
							description: '+5 to Capture Roll if the Pokemon is level 30 or below',
							value: 'Nest Ball',
						},
						{
							label: 'Net Ball',
							description: '+10 to Capture Roll if the Pokemon is a Bug or Water type',
							value: 'Net Ball',
						},
						{
							label: 'Premier Ball',
							description: '+0 to Capture Roll. Looks cool though',
							value: 'Premier Ball',
						},
						),);
						return ({embeds: [pokemonSpawnedEmbed],files:[pokemonFile],components:[PossibleActions,PossiblePokeballs]});
				}
				if(boss)
				{
					return ({embeds: [pokemonSpawnedEmbed],files:[pokemonFile],components:[PossibleActions]})
				}
	 }
};


//Spawns an item to be added to the player's inventory using Unbeliavaboat
function itemdrop(encounterLocation)
{
	//Each location has items, Common, Uncommon, Rare, Very Rare, and Ultra Rare items
	//similarly to pokemon, which rarity to pull from is decided
	//than a random item from that list is chosen
	jsonstring = './commands/Functions/Locations/Routes/' + encounterLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	locationJSON = JSON.parse(data);
	var itemPool = [locationJSON.itemsCommon,locationJSON.itemsUncommon,locationJSON.itemsRare,locationJSON.itemsVeryRare,locationJSON.itemsUltraRare];
	console.log(itemPool);
	var itemRarity = Math.floor(Math.random()*100+1);
	var rarityItems = itemPool[0];
	itemColor = "#FFFFFF"
	if(itemRarity<=40)
		{
			rarityItems = itemPool[0];
			itemColor = "#E6E7E8"
		}
		if(itemRarity>40 & itemRarity<70)
		{
			rarityItems = itemPool[1];
			itemColor = "#78B159"
		}
		if(itemRarity>70 & itemRarity<85)
		{
		rarityItems = itemPool[2];
		itemColor = "#55ACEE"
		}
		if(itemRarity>85 & itemRarity<95)
		{
		rarityItems = itemPool[3];
		itemColor = "#AA8ED6"
		}
		if(itemRarity>95)
		{
		rarityItems = itemPool[4];
		itemColor = "#F4900C"
		}
		var itemnumber = Math.floor(Math.random()*rarityItems.length)
		var chosenItem = rarityItems[itemnumber];
		const itemEmbed = new EmbedBuilder()
		.setTitle(chosenItem)
		.setColor(itemColor)
		if(chosenItem.startsWith("TM"))
		{
			chosenItem = "TM";
		}
		const itemImage = './Items/' + chosenItem +'.png'
		console.log(itemImage);
		const itemFile = new AttachmentBuilder(itemImage,{name: 'item.png'});
		itemEmbed.setImage('attachment://item.png');
		return ({embeds: [itemEmbed],files:[itemFile]});
};

//Creates an NPC trainer based on location and number of badges 
function trainer(encounterLocation, badges)
{
	//Retrieves the location.json for the encounterlocation.
	jsonstring = './commands/Functions/Locations/Routes/' + encounterLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	locationJSON = JSON.parse(data);
	//Retrieves the trainerList for the encounterlocation. This function isn't called by players so it will only be called when a location actually has trainers, so no need to verify whether or not it has them
	var trainerPool = locationJSON.trainersList;
	var numberofbadges = badges;
	var numberOfPokemon = Math.floor(Math.random()*3+1);
	console.log(numberOfPokemon)
	var trainerNumber = Math.floor(Math.random()*trainerPool.length);
	var trainer = trainerPool[trainerNumber];
	trainerClass = trainer[0];
	console.log(trainerClass)
	trainerColor = trainer[1];
	console.log(trainerColor)
	//Trainer gender is a defunct variable that was previously used to determine which pool of names for the trainer to pull from. Trainer names were ultimately cut for time purposes, so this line of code is useless.
	//However it is still here in case I decide to go back and reimplement trainer names
	//trainerGender = trainer[2];
	trainerMoney = parseInt(trainer[3]);
	trainerLevel = 0;
	//Determine a levelRange for the trainer based on the number of badges.
	switch(numberofbadges)
	{
		case "0" || "zero":
			trainerLevel = Math.floor(Math.random()*8)+3;
			break;
		case "1" || "one":
			trainerLevel = Math.floor(Math.random()*10)+9;
			break;
		case "2"||"two":
			trainerLevel = Math.floor(Math.random()*6)+17;
			break;
		case "3"||"three":
			trainerLevel = Math.floor(Math.random()*6)+21;
			break;
		case "4"||"four":
			trainerLevel = Math.floor(Math.random()*7)+25;
			break;
		case "5"||"five":
			trainerLevel = Math.floor(Math.random()*6)+30;
			break;
		case "6"||"six":
			trainerLevel = Math.floor(Math.random()*5)+34;
		case "7"||"seven":
			trainerLevel = Math.floor(Math.random()*8)+37;
			break;
		case "8"||"eight":
			trainerLevel = Math.floor(Math.random()*11)+43;
			break;
		default:
			trainerLevel = Math.floor(Math.random()*50)+3;
	}
	prizeMoneyint = trainerMoney * trainerLevel;
	prizeMoneystring = prizeMoneyint.toString();
	//console.log(trainerGender);
	const trainerEmbed = new EmbedBuilder()
	.setTitle(trainerClass)
	.setAuthor({name:'Trainer eyes meet!'})
	//.setColor(trainerColor);
	const trainerImage = './Trainer/' + trainerClass +'.png'
	console.log(trainerImage);
	const trainerFile = new AttachmentBuilder(trainerImage,{name: 'trainer.png'});
	trainerEmbed.setImage('attachment://trainer.png')
	trainerEmbed.addFields({name:'Prize Money:', value: prizeMoneystring});
	var x = 0;
	//Randomize the trainer's Pokemon based on the pool given to them by their array
	while(x<numberOfPokemon)
	{
		var min = 4;
		var max = trainer.length - min
		console.log(min + " to " + max);
		var pokeNumber = (Math.floor(Math.random()*(max)))+min;
		var trainerPokemon = trainer[pokeNumber];
		var pokemonLevel = (Math.floor(Math.random()*10)+(trainerLevel-5)).toString()
		var pokemonNumber = x+1;
		var pokemonNumberString = "Pokemon " + pokemonNumber.toString();
		trainerEmbed.addFields({name:pokemonNumberString, value: trainerPokemon});
		trainerEmbed.addFields({name:"Level:", value: pokemonLevel, inline:true});
		x++;
	}
	return ({embeds: [trainerEmbed],files:[trainerFile]});
};

//Returns the reputation of a player's faction
function reputationcheck( faction )
{
	jsonstring = './commands/Functions/reputation.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	reputationJSON = JSON.parse(data);
	console.log(reputationJSON)
	if(faction == "knight" || faction == "teamknight" || faction == "team")
	{
		var reputationexp = parseInt(reputationJSON.knightreputation)
		var reputationlevel = Math.floor(reputationexp/100)
		var reputationstring = "Team Knight's current reputation level is " + reputationlevel;
	}
	if(faction == "corp" || faction == "restoration" || faction == "restorationcorp")
	{
		var reputationexp = parseInt(reputationJSON.corpreputation)
		var reputationlevel = Math.floor(reputationexp/100)
		var reputationstring = "The Restoration Corp's current reputation level is " + reputationlevel;
	}
	return reputationstring;
}
//Adds reputation XP to the specified faction.
function reputationadd( faction, amount )
{
	jsonstring = './commands/Functions/reputation.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	reputationJSON = JSON.parse(data);
	console.log(reputationJSON)
	var knightexp = reputationJSON.knightreputation
	console.log("Knight:" + knightexp)
	var corpexp = reputationJSON.corpreputation
	console.log("Corp:" + corpexp)
	if(faction == "knight" || faction == "teamknight" || faction == "team")
	{
		var reputationexp = parseInt(knightexp) 
		console.log(reputationexp)
		var integerAmount = parseInt(amount)
		var newamount = reputationexp + integerAmount
		if( newamount > 1000)
		{
			newamount = 1000;
		}
		console.log("The new amount is " + newamount)
		knightexp = newamount.toString()
		newdata = '{ "knightreputation":' + knightexp + ',"corpreputation":' + corpexp + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully increased Team Knight reputation!"
	}
	if(faction == "corp" || faction == "restoration" || faction == "restorationcorp")
	{
		var reputationexp = parseInt(corpexp)
		var integerAmount = parseInt(amount)
		var newamount = reputationexp + integerAmount
		if( newamount > 1000)
		{
			newamount = 1000;
		}
		console.log("The new amount is " + newamount)
		var corpexp = newamount.toString()
		newdata = '{ "knightreputation":' + knightexp + ',"corpreputation":' + corpexp + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully increased Restoration Corp reputation!"
	}
	else 
	{
		return "Failed to add reputation...did you use the right keyword?"
	}
	
}

function reputationtake( faction, amount )
{
	jsonstring = './commands/Functions/reputation.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	reputationJSON = JSON.parse(data);
	console.log(reputationJSON)
	var knightexp = reputationJSON.knightreputation
	console.log("Knight:" + knightexp)
	var corpexp = reputationJSON.corpreputation
	console.log("Corp:" + corpexp)
	if(faction == "knight" || faction == "teamknight" || faction == "team")
	{
		var reputationexp = parseInt(knightexp) 
		console.log(reputationexp)
		var integerAmount = parseInt(amount)
		var newamount = reputationexp - integerAmount
		if( newamount < 0)
		{
			newamount = 0;
		}
		console.log("The new amount is " + newamount)
		knightexp = newamount.toString()
		newdata = '{ "knightreputation":' + knightexp + ',"corpreputation":' + corpexp + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully decreased Team Knight reputation!"
	}
	if(faction == "corp" || faction == "restoration" || faction == "restorationcorp")
	{
		var reputationexp = parseInt(corpexp)
		var integerAmount = parseInt(amount)
		var newamount = reputationexp - integerAmount
		if( newamount < 0)
		{
			newamount = 0;
		}
		console.log("The new amount is " + newamount)
		var corpexp = newamount.toString()
		newdata = '{ "knightreputation":' + knightexp + ',"corpreputation":' + corpexp + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully decreased Restoration Corp reputation!"
	}
	else 
	{
		return "Failed to take away reputation...did you use the right keyword?"
	}
	
}

function reputationset( faction, amount )
{
	jsonstring = './commands/Functions/reputation.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	reputationJSON = JSON.parse(data);
	console.log(reputationJSON)
	var knightexp = reputationJSON.knightreputation
	console.log("Knight:" + knightexp)
	var corpexp = reputationJSON.corpreputation
	console.log("Corp:" + corpexp)
	if(faction == "knight" || faction == "teamknight" || faction == "team")
	{
		newdata = '{ "knightreputation":' + amount + ',"corpreputation":' + corpexp + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully set Team Knight reputation!"
	}
	if(faction == "corp" || faction == "restoration" || faction == "restorationcorp")
	{
		newdata = '{ "knightreputation":' + knightexp + ',"corpreputation":' + amount + "}"
		fs.writeFileSync(jsonstring,newdata);
		return "Successfully decreased Restoration Corp reputation!"
	}
	else 
	{
		return "Failed to take away reputation...did you use the right keyword?"
	}
	
}

function quotetest(quoteLocation)
{
	jsonstring = './commands/Functions/Locations/Cities/' + quoteLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	quotesJSON = JSON.parse(data);
	console.log(quotesJSON)
	var numberofquotes = quotesJSON.quotes.length;
	return numberofquotes;
}

function teamtest(username)
{
	jsonstring = './commands/Functions/Users/' + username + '.json';
	data = '{ "pokemon":[[]]}';
	fs.writeFileSync(jsonstring,data);
	
}

function listen(gossipLocation,faction)
{

	///attempt to get the location you are in. if you can't find it return null
	try{
	jsonstring = './commands/Functions/Locations/Cities/' + gossipLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	quotesJSON = JSON.parse(data);
	}
	catch
	{
		return null;
	}
	console.log(quotesJSON);
	questlist = quotesJSON.quests
	var questChance = 0;
	questChance = Math.floor(Math.random()*10)+1;
	if(questlist.length==0)
	{
		questChance = 0;
	}
	console.log(questChance)
	dialogueFound = false;
	if(questChance == 10)
	{
		var attempts = 0;
		while(!dialogueFound && attempts < questlist.length)
		{
			var questNumber = Math.floor(Math.random()*questlist.length);
			var currentquest = questlist[questNumber];
			if(faction ==="Team Knight")
					{
						console.log("Here's a quest for a Knight!");
						var repneeded = currentquest[2]
						jsonstring = './commands/Functions/reputation.json';
						const data = fs.readFileSync(jsonstring,{encoding:'utf8', flag:'r'});
						reputationJSON = JSON.parse(data);
						var reputationexp = parseInt(reputationJSON.knightreputation)
						var reputationlevel = Math.floor(reputationexp/100)
						if(reputationlevel>=repneeded)
						{
							dialogueFound = true;
						}
					}
	            if(faction === "Restoration Corporation")
					{
						var repneeded = currentquest[3]
						jsonstring = './commands/Functions/reputation.json';
						const data = fs.readFileSync(jsonstring,{encoding:'utf8', flag:'r'});
						reputationJSON = JSON.parse(data);
						var reputationexp = parseInt(reputationJSON.corpreputation)
						var reputationlevel = Math.floor(reputationexp/100)
						if(reputationlevel>=repneeded)
						{
							dialogueFound = true;
						}
					}
			attempts++;
		}
		if(dialogueFound)
		{
			const NPCImage = './NPCs/' + currentquest[0] +'.png'
				console.log(NPCImage);
				const NPCFile = new AttachmentBuilder(NPCImage,{name: 'npc.png'});
			const dialogueEmbed =new EmbedBuilder()
			.setTitle(currentquest[6])
			.setAuthor({name:currentquest[0]})
			.setThumbnail("attachment://npc.png")
			.setDescription(currentquest[4])
			.setFooter({text:currentquest[1]});
			if(faction==="Restoration Corporation" && currentquest[5]!="NA")
			{
				dialogueEmbed.setDescription(currentquest[5]);
			}
			const PossibleActions = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
					.setCustomId('startquest')
					.setLabel('Start Quest')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
					.setCustomId('ignorequest')
					.setLabel('Ignore Quest')
					.setStyle(ButtonStyle.Danger)
				);
			return ({embeds: [dialogueEmbed],files:[NPCFile],components:[PossibleActions]});
		}
		else
		{
			const dialogueEmbed = new EmbedBuilder()
		.setTitle("Noone...")
		.setDescription("There is nobody around...");
		return({embeds:[dialogueEmbed]});
		}
	}
	else
	{
				
		while(!dialogueFound)
		{
			dialoguelist = quotesJSON.dialogue
			var dialogueNumber = Math.floor(Math.random()*dialoguelist.length);
			var currentDialogue = dialoguelist[dialogueNumber];
			if(currentDialogue[0]!="Neutral")
				{
				if((faction==="Team Knight") && currentDialogue[0] === "Knight")
					{
						dialogueFound = true;
					}
	            if((faction === "Restoration Corporation") && currentDialogue[0] === "Corp")
					{
						dialogueFound = true;
					}
				}
			else
			{
				dialogueFound = true;
			}
		}
		const NPCImage = './NPCs/'+ currentDialogue[1] + '.png'
				console.log(NPCImage);
				const NPCFile = new AttachmentBuilder(NPCImage,{name: 'npc.png'});
		const dialogueEmbed = new EmbedBuilder()
		.setTitle(gossipLocation)
		.setDescription(currentDialogue[2])
		.setThumbnail('attachment://npc.png');
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('listenagain')
					.setLabel('Keep listening to people')
					.setStyle(ButtonStyle.Primary),
			);
		return({embeds:[dialogueEmbed],files:[NPCFile],components: [JourneyMenu]});
	}
	
}

function happenings(journeyLocation,badges,progress,goal,beginning,destination)
{
	var progressInt = parseInt(progress);
	var currentGoal = parseInt(goal);
	if(progressInt >= currentGoal)
	{
		const happeningEmbed = new EmbedBuilder()
		.setTitle("Congratulations!")
		.setDescription("You made it to " + destination);
		return({embeds:[happeningEmbed]});
	}
		jsonstring = './commands/Functions/Locations/Routes/' + journeyLocation + '.json';
	const data = fs.readFileSync(jsonstring,
            {encoding:'utf8', flag:'r'});
	console.log(data);
	locationJSON = JSON.parse(data);
		happeningslist = locationJSON.happeningsList
		var happeningNumber = Math.floor(Math.random()*happeningslist.length);
		var currentHappening = happeningslist[happeningNumber];
		happeningTitle = currentHappening[0]
		var currentGoal = goal.toString();
		var currentBadges = badges;
		var newprogressInt = parseInt(progress)+1
		console.log(newprogressInt);
		var newProgress = newprogressInt.toString();
		console.log("Current progress is" + newProgress);
		console.log("Goal is still" + currentGoal);
		const happeningEmbed = new EmbedBuilder()
			.setTitle(happeningTitle)
			.setDescription(currentHappening[1])
			.setAuthor({name:journeyLocation})
			.setFooter({text:badges})
			.addFields({name:'Beginning',value:beginning,inline:true},{name:'Destination',value:destination,inline:true},{name:"\u200B",value:"\u200B",inline:true});
		happeningEmbed.addFields({name:"Progress",value: newProgress,inline:true},{name: "Goal",value: currentGoal,inline:true});
		
	if(happeningTitle === "LandPokemon")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('landpokemon')
					.setLabel('What pokemon is it?')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "WaterPokemon")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('waterpokemon')
					.setLabel('What pokemon is it?')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "SpecialPokemon")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('specialpokemon')
					.setLabel('What pokemon is it?')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "LootPokemon")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('lootpokemon')
					.setLabel('What pokemon is it?')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll TwistingScenery")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('twistingscenery')
					.setLabel('Do not get lost...')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "ShakingTree")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('headbuttpokemon')
					.setLabel('Shake the tree!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Just leave it be')
					.setStyle(ButtonStyle.Secondary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "SweetScent")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('sweetscentpokemon')
					.setLabel('Wait around...')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Keep moving')
					.setStyle(ButtonStyle.Secondary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "TrainerBattle")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('randomtrainerbattle')
					.setLabel('NPC')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('playertrainerbattle')
					.setLabel('Player')
					.setStyle(ButtonStyle.Secondary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "HiddenItem")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('hiddenitem')
					.setLabel('Look for it!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Just keep going')
						.setStyle(ButtonStyle.Danger),	
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll Obstacle")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('obstacle')
					.setLabel('Attempt to get past the obstacle')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
						.setCustomId('failobstacle')
						.setLabel('Go around...')
						.setStyle(ButtonStyle.Danger),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll Shortcut")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('shortcut')
					.setLabel('Attempt to take a shortcut')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Stay on the path...')
						.setStyle(ButtonStyle.Danger),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll Item")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('rollitem')
					.setLabel('Attempt to retrieve the item')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll Navigation")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('navigation')
					.setLabel('Do not get lost...')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll StuckInMud")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('stuckinmud')
					.setLabel('Do your best to break out...')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll DucklettAttack")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('ducklettattack')
					.setLabel('Run away!')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll CaveNavigation")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('twistingscenery')
					.setLabel('Do not get lost...')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Roll Train!!!")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('train')
					.setLabel('Get out of the way!')
					.setStyle(ButtonStyle.Primary),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Pokeball?")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('fakeball')
					.setLabel('Pick it up..')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Fishing")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('oldRod')
					.setLabel('Use an oldRod')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('goodRod')
					.setLabel('Use an goodRod')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('superRod')
					.setLabel('Use an superRod')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "DistressedPokemon")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('distressedmon')
					.setLabel('Help it out!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Quest Fomelhaut")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('fomelquest')
					.setLabel('Get closer...')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if (happeningTitle === "Quest Boletta") {
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('bolettaquest')
					.setLabel('Help')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Keep walking')
					.setStyle(ButtonStyle.Danger)
			);
		return ({ embeds: [happeningEmbed], components: [JourneyMenu] });
	}
	if(happeningTitle === "Quest Daffodil")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('daffodilquest')
					.setLabel('Get closer...')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Ignore him')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
if(happeningTitle === "ShipInvestigation")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('shipinvestigate')
					.setLabel('Check it out!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Ignore it and move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "JunkInvestigation")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('junkinvestigate')
					.setLabel('Start digging!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Ignore it and move on...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "DorotheaQuest")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('search')
					.setLabel('Look around...')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Keep moving...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "Gimmighoul")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('gimmighoul')
					.setLabel('Grab it!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Keep moving...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle.startsWith("Discovery"))
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('discover')
					.setLabel('Investigate!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Keep moving...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	if(happeningTitle === "DeliciousSnowTreat")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('eatsnow')
					.setLabel('Try it, Gordon, try it!')
					.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Keep moving...')
						.setStyle(ButtonStyle.Danger)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	
	if(happeningTitle === "RyleeQuest")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('fight')
					.setLabel('Fight them!')
					.setStyle(ButtonStyle.Primary)
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}

	if(happeningTitle === "DeadEnd")
	{
		const JourneyMenu = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('failobstacle')
					.setLabel('Go around')
					.setStyle(ButtonStyle.Danger),
			);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	else 
	{
		const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next Stop!')
						.setStyle(ButtonStyle.Primary),
					);
		return ({embeds: [happeningEmbed],components: [JourneyMenu]});
	}
	}

	function displayParty(username)
	{
	try{
		jsonstring = './commands/Functions/Users/' + username + '.json';
		console.log(jsonstring);
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
	}
	catch(err){
		console.log("NO!");
		return null;
	}
		var numberOfPokemon = playerJSON.party.length;
		if(numberOfPokemon===0)
		{
			return ({content:"You have no Pokemon!"})
		}
		const partyEmbed = new EmbedBuilder()
		.setTitle(playerJSON.characterName + "'s Party")
		.setAuthor({name: username});
		var x = 0;
		while(x<numberOfPokemon)
		{
			var pokemonNickname = playerJSON.party[x][1];
			var pokemonLevel = playerJSON.party[x][5];
			partyEmbed.addFields({name:pokemonNickname ,value:pokemonLevel});
			x++
		}
		
		
		//Add Buttons To Code To Look At Pokemon More Closely
		const PartyMenu = new ActionRowBuilder();
		var y =0;
		while(y<numberOfPokemon && y<3)
		{
			var buttonNumber = y.toString()
			var pokemonNickname = playerJSON.party[y][1];
			PartyMenu.addComponents(
				new ButtonBuilder()
					.setCustomId('pokemon' + y)
					.setLabel(pokemonNickname)
					.setStyle(ButtonStyle.Primary),
			);
			y++;
		}
		if(numberOfPokemon>3)
		{
		const PartyMenu2 = new ActionRowBuilder();
		while(y<numberOfPokemon)
		{
			var buttonNumber = y.toString()
			var pokemonNickname = playerJSON.party[y][1];
			PartyMenu2.addComponents(
				new ButtonBuilder()
					.setCustomId('pokemon'+y)
					.setLabel(pokemonNickname)
					.setStyle(ButtonStyle.Primary),
			);
			y++;
		}
		console.log(partyEmbed);
		return ({embeds:[partyEmbed],components:[PartyMenu,PartyMenu2]});
		}
		else
		{
			console.log(partyEmbed);
		return ({embeds:[partyEmbed],components:[PartyMenu]});
		}
		
	}
	
	function experience(defeatedLevel,username,baseExperienceYield)
	{
	try{
			jsonstring = './commands/Functions/Users/' + username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
	}
	catch(err)
	{
		return null;
	}
		var sumLevel =0;
		var x =0;
		while(x<playerJSON.party.length)
		{
			sumLevel+=parseInt(playerJSON.party[x][5]);
			x++;
		}
		var averageLevel = Math.round(sumLevel/playerJSON.party.length);
		console.log("Average level is" + averageLevel);
		var LP = parseInt(averageLevel);
		var L = parseInt(defeatedLevel);
		var b = parseInt(baseExperienceYield);
		var A = Math.round((2*L)+10);
		console.log("2 Times" + L + " Plus 10 is" + A);
		var B = Math.round((b*L)/5);
		console.log(b + " times " + L + "divided by 5 is" + B)
		var C = (LP+L+10)
		console.log(LP + " plus " + L + " plus 10 is " + C)
		var expGained = Math.floor(Math.floor(Math.sqrt(A)*(A*A)*B/Math.floor(Math.sqrt(C)*(C*C))))+1;
		if(username === "Lummox")
		{
			expGained*=1.5
		}
		if(expGained>100000)
		{
			expGained = 100000
		}
		console.log(expGained);
		return expGained;
	}

	function checkLeveledUp(username, partyMemberNumber)
	{
		
		jsonstring = './commands/Functions/Users/' + username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);

		pokemon = playerJSON.party[partyMemberNumber]
		var totalEXP = parseInt(pokemon[6])
		var growthRate = pokemon[7]
		var levelCurve = [];
		jsongrowth = './growthrates.json'
		var levelRates = require(jsongrowth);
		var currentLevel = pokemon[5];
		var newLevel = pokemon[5];
		var leveledUp = false;
		switch (growthRate)
		{
			case "Erratic":
			levelCurve = levelRates.erratic;
			break;
			case "Fast":
			levelCurve = levelRates.fast;
			break;
			case "Medium Fast":
			levelCurve = levelRates.mediumfast;
			break;
			case "Medium Slow":
			levelCurve = levelRates.mediumslow;
			break;
			case "Slow":
			levelCurve = levelRates.slow;
			break;
			case "Fluctuating":
			levelCurve = levelRates.fluctuating;
			break;
		}
		var x = 0;
		while(totalEXP>levelCurve[x])
		{
			newLevel = x+1;
			x++;
			
		}
		if(newLevel > playerJSON.levelCap)
		{
			newLevel = playerJSON.levelCap.toString();
			currentEXP = levelCurve[playerJSON.levelCap] - 1;
		}
		if(newLevel>currentLevel)
		{
			leveledUp = true;
			pokemon[5] = newLevel.toString();
			jsonStr = JSON.stringify(playerJSON)
			fs.writeFileSync(jsonstring,jsonStr)
		}
		if(leveledUp)
		{
			console.log("Pokemon leveled up, lets increase its friendship!")
			if (parseInt(pokemon[8]) < 100) {
				friendship(username, pokemon[22], 5);
				console.log("Friendship increasing by 5")
			}
			else if (parseInt(pokemon[8]) >= 100 && parseInt(pokemon[8]) < 200) {
				friendship(username, pokemon[22], 4);
				console.log("Friendship increasing by 4")
			}
			else if (parseInt(pokemon[8]) > 199) {
				friendship(username, pokemon[22], 3);
				console.log("Friendship increasing by 3")
			}
			return pokemon[1] + " leveled up to " + newLevel + "! ";
		}
		else
		{
			return "";
		}

}

function displayBox(username,pageNumber) {
	
	try{	
	jsonstring = './commands/Functions/Users/' + username + '.json';
		const data = fs.readFileSync(jsonstring,
			{ encoding: 'utf8', flag: 'r' });
		playerJSON = JSON.parse(data);
		}
		catch(err)
		{
			return null;
		}
	
	var pageNumber = parseInt(pageNumber)
	var pageIndex = pageNumber * 18;
	var lastIndex = pageIndex - 1;
	var firstIndex = lastIndex - 17;
	if (lastIndex > playerJSON.box.length-1) {
		lastIndex = playerJSON.box.length;
	}
	var amountofPages = Math.floor(playerJSON.box.length / 18)
	if (playerJSON.box.length % 18 != 0) {
		amountofPages++;
    }
	const pagesString = amountofPages.toString();
	const boxEmbed = new EmbedBuilder()
		.setTitle(playerJSON.characterName + "'s Box")
		.setAuthor({ name: username })
		.setFooter({ text: pageNumber + " of " + pagesString })

	var x = firstIndex;
	while (x < lastIndex) {
		var pokemonNickname = playerJSON.box[x][1];
		var pokemonId = playerJSON.box[x][22];
		if (x + 1 < playerJSON.box.length) {
			var pokemon2Nickname = playerJSON.box[x + 1][1];
			var pokemon2Id = playerJSON.box[x + 1][22];
			boxEmbed.addFields({ name: pokemonNickname, value: pokemonId, inline: true }, { name: pokemon2Nickname, value: pokemon2Id, inline: true });
			x += 2;
		}
		else
		{
			boxEmbed.addFields({ name: pokemonNickname, value: pokemonId, inline: true });
			x++
		}	
	}
	const BoxMenu = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('firstpage')
				.setLabel('First Page!')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('prevpage')
				.setLabel('Prev Page!')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('nextpage')
				.setLabel('Next Page!')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('lastpage')
				.setLabel('Last Page!')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('closebox')
				.setLabel('Close Box!')
				.setStyle(ButtonStyle.Primary),
		);
	return ({embeds:[boxEmbed],components:[BoxMenu]})
}

	function nickname(username, pokemonId, nickname) {
	try{	
	jsonstring = './commands/Functions/Users/' + username + '.json';
		const data = fs.readFileSync(jsonstring,
			{ encoding: 'utf8', flag: 'r' });
		playerJSON = JSON.parse(data);
		}
		catch(err)
		{
			return null;
		}
		var pokemonFound = false;
		var x = 0
		console.log(username + " " + pokemonId + nickname)
		while (x < playerJSON.party.length)
		{
			console.log(playerJSON.party[x][22])
			if (playerJSON.party[x][22] == pokemonId) {
				playerJSON.party[x][1] = nickname
				pokemonFound = true;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring, jsonStr)
				return "Set Pokemon in party's name"
			}
			x++
		}
		var y = 0
		while (y < playerJSON.box.length) {
			if (playerJSON.box[y][22] == pokemonId) {
				playerJSON.box[y][1] = nickname
				pokemonFound = true;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring, jsonStr)
				return "Set Pokemon in party's name"
			}
			y++
		}
		
		if (!pokemonFound) {
			return "No pokemon with that id found in box or party"
        }
}

function info(username, pokemonId) {
	
try{
	jsonstring = './commands/Functions/Users/' + username + '.json';
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	}
catch(err){
	return null;
}
	var pokemonFound = false;
	var pokemonInfo = [];
	var x = 0;
	while (x < playerJSON.party.length && !pokemonFound) {
			console.log(playerJSON.party[x])
		if (pokemonId == playerJSON.party[x][22]) {
			pokemonInfo = playerJSON.party[x]
			pokemonFound = true;
		}
		else {
			x++
		}
	}
	var y = 0;
	while (y < playerJSON.box.length && !pokemonFound) {
		console.log(playerJSON.box[y])
		if (pokemonId == playerJSON.box[y][22]) {
			pokemonInfo = playerJSON.box[y]
			pokemonFound = true;
		}
		else {
			y++
		}
	}
	if (!pokemonFound) {
		return "That pokemon does not exist"
	}
	console.log(pokemonInfo);


	var pokemonName = pokemonInfo[0];
	console.log(pokemonName);
	var pokemonNickname = pokemonInfo[1];
	console.log(pokemonNickname);
	var pokemonGender = pokemonInfo[2];
	console.log(pokemonGender);
	var pokemonAbility = pokemonInfo[3];
	console.log(pokemonAbility);
	var metLocation = pokemonInfo[4];
	console.log(metLocation);
	var pokemonLevel = pokemonInfo[5];
	var expPoints = pokemonInfo[6];
	var levelingRate = pokemonInfo[7];
	var pokemonNature = pokemonInfo[15];
	var pokemonID = pokemonInfo[22];
	var pokemonfriendship = pokemonInfo[8]
	console.log(pokemonfriendship)
	var y = 16;
	var IVString = "";
	while (y < 22) {
		IVString += pokemonInfo[y];
		if (y != 21) {
			IVString += "/"
		}
		y++
	}
	jsongrowth = './growthrates.json'
	var growthRates = require(jsongrowth);
	switch (levelingRate) {
		case "Erratic":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.erratic;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		case "Fast":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.fast;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		case "Medium Fast":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.mediumfast;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		case "Medium Slow":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.mediumslow;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		case "Slow":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.slow;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		case "Fluctuating":
			var nextLevel = parseInt(pokemonLevel);
			expAtLevel = growthRates.fluctuating;
			var toNextLevel = expAtLevel[nextLevel] - parseInt(expPoints);
			break;
		default:
			break;
	}
	const pokemonEmbed = new EmbedBuilder()
		.setTitle(pokemonNickname + " Lv. " + pokemonLevel)
		.setAuthor({ name: username })
		.addFields({ name: "Name", value: pokemonName, inline: true }, { name: "Gender", value: pokemonGender, inline: true }, { name: "ID", value: pokemonID, inline: true })
		.addFields({ name: "Ability", value: pokemonAbility, inline: true }, { name: "Exp. Points", value: expPoints, inline: true }, { name: "To Next Lv.", value: toNextLevel.toString(), inline: true })
		.addFields({ name: "Nature", value: pokemonNature, inline: true }, { name: "Met in", value: metLocation, inline: true }, { name: "IVs", value: IVString, inline: true })
		.addFields({ name: "HP EVs", value: pokemonInfo[9], inline: true }, { name: "Atk EVs", value: pokemonInfo[10], inline: true }, { name: "Def EVs", value: pokemonInfo[11], inline: true })
		.addFields({ name: "SpA EVs", value: pokemonInfo[12], inline: true }, { name: "SpD EVs", value: pokemonInfo[13], inline: true }, { name: "Spe EVs", value: pokemonInfo[14], inline: true })
	if (parseInt(pokemonfriendship) == 0) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")"+ "You aren't getting along, are you? It doesn't look like it's having fun even when you're together." })
	}
	if (parseInt(pokemonfriendship) > 0 && parseInt(pokemonfriendship) < 50) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You aren't getting along, are you? It's glaring at you with a look that's kinda scary." })
	}
	if (parseInt(pokemonfriendship) > 49 && parseInt(pokemonfriendship) < 100) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You still have room for improvement. How nice! I mean, you can become even better friends!" })
	}
	if (parseInt(pokemonfriendship) > 99 && parseInt(pokemonfriendship) < 150) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You're starting to get to be friends. Just maybe, walking along the same path has made you understand one another." })
	}
	if (parseInt(pokemonfriendship) > 149 && parseInt(pokemonfriendship) < 200) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You seem really close! You look so, so happy! It's enough to make me happy too!" })
	}
	if (parseInt(pokemonfriendship) > 199 && parseInt(pokemonfriendship) < 255) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You two sure get along great! It looks like you are having fun together! You seem bright and cheerful!" })
	}
	if (parseInt(pokemonfriendship) == 255) {
		pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "What great friends you are! It's so nice how you trust each other! It makes me kinda jealous!" })
	}
	return { embeds: [pokemonEmbed] }
}

function deposit(username, pokemonId) {
	jsonstring = './commands/Functions/Users/' + username + '.json';
	try{
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	}
	catch(err)
	{
	return null;
	}
	var pokemonFound = false;
	var pokemonInfo = [];
	var x = 0;
	while (x < playerJSON.party.length && !pokemonFound) {
		console.log(playerJSON.party[x])
		if (pokemonId == playerJSON.party[x][22]) {
			pokemonInfo = playerJSON.party[x]
			pokemonFound = true;
		}
		else {
			x++
		}
	}
	if (!pokemonFound) {
		return "That pokemon is not in your party"
	}
	var depositedMon = playerJSON.party.splice(x, 1);
	playerJSON.box.push(depositedMon[0]);
	jsonStr = JSON.stringify(playerJSON)
	fs.writeFileSync(jsonstring, jsonStr)

	jsonStr = JSON.stringify(playerJSON)
	fs.writeFileSync(jsonstring, jsonStr)
	return "Pokemon moved to Box"
}

function withdraw(username, pokemonId) {
	jsonstring = './commands/Functions/Users/' + username + '.json';
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	var pokemonFound = false;
	var pokemonInfo = [];
	var x = 0;
	while (x < playerJSON.box.length && !pokemonFound) {
		console.log(playerJSON.box[x])
		if (pokemonId == playerJSON.box[x][22]) {
			pokemonFound = true;
		}
		else {
			x++
		}
	}
	if (!pokemonFound) {
		return "That pokemon is not in your box"
	}
	var depositedMon = playerJSON.box.splice(x, 1);
	playerJSON.party.push(depositedMon[0]);
	jsonStr = JSON.stringify(playerJSON)
	fs.writeFileSync(jsonstring, jsonStr)
	return "Pokemon moved to Party"
}

function giveEVs(username, evString) {
	console.log("Recieved EVString:" + evString)
	jsonstring = './commands/Functions/Users/' + username + '.json';
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	var partyMemberNumber = 0;
	var hpPos = 9;
	var atkPos = 10;
	var defPos = 11;
	var spAPos = 12;
	var spDPos = 13;
	var spePos = 14;
	const EVs = evString.split(",").map(num => num);
	console.log(EVs);
	while (partyMemberNumber < playerJSON.party.length) {
		var x = 0;
		pokemon = playerJSON.party[partyMemberNumber];
		var totalEVs = parseInt(pokemon[9]) + parseInt(pokemon[10]) + parseInt(pokemon[11]) + parseInt(pokemon[12]) + parseInt(pokemon[13]) + parseInt(pokemon[14])
		if (totalEVs < 510) {
			while (x < EVs.length) {
				currentEV = EVs[x]
				
				if (currentEV.includes("HP")) {
					if (parseInt(pokemon[hpPos]) < 252) {
						var newHPEVs = parseInt(EVs[x]) + parseInt(pokemon[hpPos])
						pokemon[hpPos] = newHPEVs.toString();
					}
				}
				if (currentEV.includes("Atk") && !currentEV.includes("Sp.")) {
					if (parseInt(pokemon[atkPos]) < 252) {
						var newAtkEVs = parseInt(EVs[x]) + parseInt(pokemon[atkPos])
						pokemon[atkPos] = newAtkEVs.toString();
					}
				}
				if (currentEV.includes("Def") && !currentEV.includes("Sp.")) {
					if (parseInt(pokemon[defPos]) < 252) {
						var newDefEVs = parseInt(EVs[x]) + parseInt(pokemon[defPos])
						pokemon[defPos] = newDefEVs.toString();
					}
				}
				if (currentEV.includes("Atk") && currentEV.includes("Sp.")) {
					if (parseInt(pokemon[spAPos]) < 252) {
						var newSpAEVs = parseInt(EVs[x]) + parseInt(pokemon[spAPos])
						pokemon[spAPos] = newSpAEVs.toString();
					}
				}
				if (currentEV.includes("Def") && currentEV.includes("Sp.")) {
					if (parseInt(pokemon[spDPos]) < 252) {
						var newSpDEVs = parseInt(EVs[x]) + parseInt(pokemon[spDPos])
						pokemon[spDPos] = newSpDEVs.toString();
					}
				}
				if (currentEV.includes("Speed")) {
					if (parseInt(pokemon[spePos]) < 252) {
						var newSpeEVs = parseInt(EVs[x]) + parseInt(pokemon[spePos])
						pokemon[spePos] = newSpeEVs.toString();
					}
				}
				x++
			}

			jsonStr = JSON.stringify(playerJSON)
			fs.writeFileSync(jsonstring, jsonStr)
			partyMemberNumber++;
		}
	}
}


function pokeswitch(username, pokemonId, pokemon2Id)
{
	jsonstring = './commands/Functions/Users/' + username + '.json';
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	var pokemon1Found = false;
	var pokemon2Found = false;
	var pokemon1 = [];
	var pokemon2 = [];
	var pokemon1loc = "";
	var pokemon2loc = "";
	var pokemon1index = 0;
	var pokemon2index = 0;
	var x = 0;
	while (x < playerJSON.party.length && !pokemon1Found) {
		if (pokemonId == playerJSON.party[x][22]) {
			console.log("Found pokemon 1 in the party")
			pokemon1 = playerJSON.party[x]
			pokemon1Found = true;
			pokemon1loc = "party"
			pokemon1index = x;
		}
		else {
			x++
		}
	}
	var y = 0;
	while (y < playerJSON.party.length && !pokemon1Found) {
		if (pokemonId == playerJSON.box[y][22]) {
			console.log("Found pokemon 1 in the box")
			pokemon1 = playerJSON.box[y]
			pokemon1Found = true;
			pokemon1loc = "box"
			pokemon1index = y;
		}
		else {
			y++
		}
	}
	var a = 0;
	while (a < playerJSON.party.length && !pokemon2Found) {
		if (pokemon2Id == playerJSON.party[a][22]) {
			console.log("Found pokemon 2 in the party")
			pokemon2 = playerJSON.party[a]
			pokemon2Found = true;
			pokemon2loc = "party"
			pokemon2index = a;

		}
		else {
			a++
		}
	}
	var b = 0;
	while (b < playerJSON.box.length && !pokemon2Found) {
		if (pokemon2Id == playerJSON.box[b][22]) {
			console.log("Found pokemon 2 in the box")
			pokemon2 = playerJSON.box[b]
			pokemon2Found = true;
			pokemon2loc = "box"
			pokemon2index = b;
		}
		else {
			b++
		}
	}
	if (pokemon1Found && pokemon2Found)
	{
		if (pokemon1loc === "party") {
			if (pokemon2loc === "party") {
				console.log("Both pokemon are in the party")
				var temp = playerJSON.party[pokemon1index];
				console.log(temp)
				playerJSON.party[pokemon1index] = playerJSON.party[pokemon2index];
				playerJSON.party[pokemon2index] = temp;
			}
			else {
				console.log("Pokemon1 is in the party and pokemon2 is in the box")
				var temp = playerJSON.party[pokemon1index];
				console.log(temp)
				playerJSON.party[pokemon1index] = playerJSON.box[pokemon2index];
				playerJSON.box[pokemon2index] = temp;
            }
		}
		if (pokemon1loc === "box") {
			if (pokemon2loc === "party") {
				console.log("Pokemon1 is in the box and pokemon2 is in the party")
				var temp = playerJSON.box[pokemon1index];
				console.log(temp)
				playerJSON.box[pokemon1index] = playerJSON.party[pokemon2index];
				playerJSON.party[pokemon2index] = temp;
			}
			else {
				console.log("Box pokemon are in the box")
				var temp = playerJSON.box[pokemon1index];
				console.log(temp)
				playerJSON.box[pokemon1index] = playerJSON.box[pokemon2index];
				playerJSON.box[pokemon2index] = temp;
            }

        }
    }
	jsonStr = JSON.stringify(playerJSON)
	fs.writeFileSync(jsonstring, jsonStr)
	return "Pokemon switched!"
}

function friendship(username, pokemonId, amount)
{
	try{
	jsonstring = './commands/Functions/Users/' + username + '.json';
	const data = fs.readFileSync(jsonstring,
		{ encoding: 'utf8', flag: 'r' });
	playerJSON = JSON.parse(data);
	}
	catch(err)
	{
		return null;
	}
	amountInt = parseInt(amount)
	var x = 0;
	pokemonFound = false;
	while (x < playerJSON.party.length && !pokemonFound)
	{
		if (pokemonId == playerJSON.party[x][22]) {
			pokemon = playerJSON.party[x]
			pokemonFound = true;
		}
		else {
			x++
		}
	}
	if (pokemonFound) {
		currentFriendship = parseInt(pokemon[8])
		newFriendship = currentFriendship + amountInt;
		console.log("new friendship is " + newFriendship)
		if (newFriendship > 255) {
			newFriendship = 255;
			console.log("that was too high setting it to 255!")
        }
		pokemon[8] = newFriendship.toString();
		jsonStr = JSON.stringify(playerJSON)
		fs.writeFileSync(jsonstring, jsonStr)
		return "yes";
	}
	
}

module.exports = {friendship, giveEVs, pokeswitch, withdraw,deposit, info, displayBox, nickname, checkLeveledUp, experience, displayParty, listen, encounter, trainer, itemdrop, happenings ,count, quotetest, teamtest, reputationcheck, reputationadd, reputationtake, reputationset}