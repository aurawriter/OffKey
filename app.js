const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const {EmbedBuilder, ActionRowBuilder , ButtonBuilder, ButtonStyle, AttachmentBuilder} = require('discord.js');
const { token } = require('./config.json');
const {giveEVs, displayBox, checkLeveledUp, experience, happenings, encounter, trainer, itemdrop,reputationadd, listen}=require('./commands/Functions/functions.js')
const picture = './rotom.png'
const client = new Client(
	{intents: 
	[	
		GatewayIntentBits.Guilds,	
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady,c=>{
console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(token);
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	//client.user.setAvatar('./rotom.png')
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



client.on(Events.InteractionCreate, interaction => {
	if (interaction.isButton())
	{
		console.log("A button was pushed!");
		console.log(interaction.customId);
		if(interaction.customId === 'Run')
		{

				var embedjson = interaction.message.embeds[0].toJSON();
				if(embedjson.title.startsWith("#"))
		{
			console.log("It starts with a #")
			var pokemonName = embedjson.title.substring(5);
		}
		else
		{
			console.log("It's a shiny so it doesn't start with a #")
			var og = embedjson.title;
			console.log(og)
			var hashIndex = og.indexOf("#");
			console.log("The # is at index" + hashIndex)
			if(hashIndex !== -1)
			{
				console.log("The hash exists!");
				var whiteSpaceIndex = og.indexOf(" ",hashIndex);
				console.log("The space after the # is at "+ whiteSpaceIndex)
				if(whiteSpaceIndex!==-1)
				{
					console.log("The space exists")
					var numberString = og.substring(hashIndex+1,whiteSpaceIndex);
					console.log("numberString is " + numberString)
					var numberToRemove = parseInt(numberString);
					console.log("numbertoRemove is " + numberToRemove);
					var firstHalf = og.slice(0,hashIndex)
					console.log(firstHalf)
					var secondHalf = og.slice(whiteSpaceIndex);
					console.log(secondHalf)
					var pokemonName = firstHalf + secondHalf;
					console.log("name is" + pokemonName)
				}
			}
		}
				interaction.reply({content:"You escaped from the" + pokemonName});
				interaction.message.delete();
		}
		if(interaction.customId === 'battle')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var advantage = parseInt(embedjson.fields[12].value);
			var rarity = embedjson.fields[2].value;
			if(embedjson.title.startsWith("#"))
		{
			console.log("It starts with a #")
			var pokemonName = embedjson.title.substring(5);
		}
		else
		{
			console.log("It's a shiny so it doesn't start with a #")
			var og = embedjson.title;
			console.log(og)
			var hashIndex = og.indexOf("#");
			console.log("The # is at index" + hashIndex)
			if(hashIndex !== -1)
			{
				console.log("The hash exists!");
				var whiteSpaceIndex = og.indexOf(" ",hashIndex);
				console.log("The space after the # is at "+ whiteSpaceIndex)
				if(whiteSpaceIndex!==-1)
				{
					console.log("The space exists")
					var numberString = og.substring(hashIndex+1,whiteSpaceIndex);
					console.log("numberString is " + numberString)
					var numberToRemove = parseInt(numberString);
					console.log("numbertoRemove is " + numberToRemove);
					var firstHalf = og.slice(0,hashIndex)
					console.log(firstHalf)
					var secondHalf = og.slice(whiteSpaceIndex);
					console.log(secondHalf)
					var pokemonName = firstHalf + secondHalf;
					console.log("name is" + pokemonName)
				}
			}
		}
			console.log(pokemonName)
			var pokemonLevel = embedjson.fields[3].value
			var pokemonHP = parseInt(embedjson.fields[7].value)
			var catchDC = parseInt(embedjson.fields[13].value)
			var BaseEXPYield = parseInt(embedjson.fields[16].value)
			var EVstring = embedjson.fields[11].value;
		
			console.log(pokemonLevel)
			var moneyEarned = 0;
			switch(rarity)
			{
				case "Common":
				moneyEarned = pokemonLevel * 4;
				break;
				case "Uncommon":
				moneyEarned = pokemonLevel * 8;
				break;
				case "Rare":
				moneyEarned = pokemonLevel * 12;
				break;
				case "Very Rare":
				moneyEarned = pokemonLevel * 16;
				break;
				case "Ultra Rare":
				moneyEarned = pokemonLevel * 20;
				break;
				default:
				moneyEarned = 100;
			}
			var battleroll = (Math.floor(Math.random()*20+1))+advantage;
			console.log(battleroll)
			if(battleroll>=5 || pokemonHP == 1)
			{
				console.log("Battleroll was high enough, or the pokemon's HP was already 1")	
				if(pokemonHP>1)
				{
					var lostHP = pokemonHP-1;
					var newDC = catchDC - Math.floor((lostHP/10));
					const receivedEmbed = interaction.message.embeds[0];
					receivedEmbed.fields.forEach(field => {
							if(field.name == 'Pokemon HP')
								{
									field.name='Pokemon HP'
									field.value = "1";
								}
						})
						receivedEmbed.fields.forEach(field => {
							if(field.name == 'Catching Difficulty')
								{
									field.name ="Catching Difficulty"
									field.value = newDC.toString();
								}
						})
				interaction.message.edit({embeds: [receivedEmbed],attachments:[]});		
				}
				else if(pokemonHP==1)
				{
				console.log("Pokemon was at 1 HP already so its dead now")
				////EXP GAINING CODE
					var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);
					console.log("EV string is" + EVstring)
					giveEVs(interaction.user.username,EVstring)
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
				var message =  interaction.user.tag + " beat the level " + pokemonLevel + " " +pokemonName + ". It dropped materials worth " + moneyEarned + "P! " + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				////DELETE THE POKEMON EMBED
				interaction.reply({content:message});
				interaction.message.delete();
				}
			}
			else
			{
				console.log(battleroll +  " is lower than 5")
				interaction.reply({content:"Couldn't beat the "+ pokemonName+ "...it ran away..."});
				interaction.message.delete();
			}
		}
		if(interaction.customId==='nexthappening')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var journeylocation = embedjson.author.name;
			var badgesobtained = embedjson.footer.text;
			progress = embedjson.fields[3].value;
			console.log(progress);
			goal = embedjson.fields[4].value;
			console.log(goal);
			beginning = embedjson.fields[0].value;
			destination = embedjson.fields[1].value;
			var happeningembed = happenings(journeylocation,badgesobtained,progress,goal,beginning,destination);
			interaction.message.edit({components: []});
			interaction.reply(happeningembed);
		}
		if(interaction.customId==='listenagain')
		{
		var embedjson = interaction.message.embeds[0].toJSON()
		var listenLocation = embedjson.title;
		if(interaction.member.roles.cache.some(r => r.name === "Restoration Corporation"))
			{
			var listenEmbed = listen(listenLocation,"Restoration Corporation")
			}
			else if(interaction.member.roles.cache.some(r =>r.name==="Team Knight"))
			{
			var listenEmbed = listen(listenLocation,"Team Knight")
			}
		interaction.reply(listenEmbed)

		}
		if(interaction.customId==='wonbattle')
		{
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);	
			interaction.message.edit({components:[JourneyMenu]});
		}
		if(interaction.customId==='wonlootbattle')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var encounterlocation = (embedjson.author.name).toString();
			var item = itemdrop(encounterlocation);
			interaction.message.reply(item);
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);	
			interaction.message.edit({components:[JourneyMenu]});
		}
	
		if(interaction.customId==='landpokemon')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "land", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId==='waterpokemon')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "water", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId ==='startquest')
		{
			var embedjson = interaction.message.embeds[0].toJSON();
			var modID = embedjson.footer.text
			interaction.reply(`<@${modID}>`)
			interaction.message.edit({components:[]});
		}
		if (interaction.customId ==='ignorequest')
		{
			interaction.message.delete()
		}
		if(interaction.customId==='sweetscentpokemon')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "sweetscent", numberofbadges);
			interaction.reply(pokemonembed);
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
			interaction.message.edit({embeds:[receivedEmbed],components:[JourneyMenu]});
		}
		if(interaction.customId==='headbuttpokemon')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "headbutt", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId==='lootpokemon')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "land", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonlootbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId==='randomtrainerbattle')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var trainerembed = trainer(encounterlocation,numberofbadges);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.reply(trainerembed);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId==='playertrainerbattle')
		{
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});
		}
		if(interaction.customId==='specialpokemon')
		{
		var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "special", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});	
		}
		if(interaction.customId==='rollitem')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var itemroll = (Math.floor(Math.random()*20)+1)
			if(itemroll>=10)
			{
				var encounterlocation = (embedjson.author.name).toString();
				var item = itemdrop(encounterlocation);
				interaction.message.reply(item);
			}
			else
			{
				interaction.message.reply("Failed to retrieve the item...");
			}
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
			interaction.message.edit({components:[JourneyMenu]});
		}
		if(interaction.customId==='hiddenitem')
		{
			
			var embedjson = interaction.message.embeds[0].toJSON()
			var encounterlocation = (embedjson.author.name).toString();
			var item = itemdrop(encounterlocation);
			interaction.message.reply(item);
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);	
			interaction.message.edit({embeds:[receivedEmbed],components:[JourneyMenu]});
		}
		if(interaction.customId==='lostbattle')
		{
			
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
			interaction.message.edit({embeds: [receivedEmbed],components:[JourneyMenu]});
		}
		if(interaction.customId === 'navigation')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var navroll = (Math.floor(Math.random()*20)+1)
			if(navroll<5)
			{	
				
				var encounterlocation = (embedjson.author.name).toString();
				jsonstring = './commands/Functions/Locations/Routes/'+ encounterlocation+ '.json'
				var locationJSON = require(jsonstring);
				var beginning = embedjson.fields[0].value;
				var currentDestination = embedjson.fields[1].value;
				var newDestination = "";
				var x = 0;
				while(x<locationJSON.connections.length)
				{
					if(locationJSON.connections[x]!=beginning && locationJSON.connections[x]!=currentDestination)
					{
						newDestination = locationJSON.connections[x];
					}
					x++
				}
				interaction.message.reply("Lost your way...now going to "+newDestination) 
				var newGoal = "0"
				var y = 0;
				while(y<locationJSON.goals.length)
				{
					if(locationJSON.goals[y][0]===beginning&&locationJSON.goals[y][1]===newDestination)
					{
						console.log("Found the goal,");
						newGoal = locationJSON.goals[y][2]
					}
					y++
				}
					const receivedEmbed = interaction.message.embeds[0];
					receivedEmbed.fields.forEach(field => {
					if(field.name == 'Destination')
					{
						console.log("Found the Destination field")
						field.name = "Destination"
						field.value = newDestination
					}
					if(field.name == 'Goal')
					{
						console.log("Found the Goal field")
					field.name = "Goal"
					field.value = newGoal;
					}
					});
					console.log(receivedEmbed.toJSON());
					const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
					interaction.message.edit({embeds:[receivedEmbed],components:[JourneyMenu]});
				
			}
			else
			{
				interaction.message.reply("Still going the intended way!")
				const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
				interaction.message.edit({components:[JourneyMenu]});
			}
			
		}
		if(interaction.customId==='twistingscenery')
		{
			console.log("TwistingScenery")
			var navroll = (Math.floor(Math.random()*20)+1)
			console.log(navroll)
			if(navroll>=10)
			{
					console.log("Successful navigation!")
				const JourneyMenu = new ActionRowBuilder()	
					.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
						);
				interaction.message.reply("Successful navigation!")
				interaction.message.edit({components:[JourneyMenu]});
			}
			else
			{
				console.log("Failed navigation :(")
				const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("Failed to navigate correctly...");
				interaction.message.edit({embeds: [receivedEmbed],components:[JourneyMenu]});
			}
		}
		if(interaction.customId==='shortcut')
		{
			console.log("Shortcut!")
			var navroll = (Math.floor(Math.random()*20)+1)
			console.log(navroll)
			if(navroll<10)
			{
					console.log("Failed Shortcut")
				const JourneyMenu = new ActionRowBuilder()	
					.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
						);
				interaction.message.reply("Shortcut failed!")
				interaction.message.edit({components:[JourneyMenu]});
			}
			else
			{
				console.log("Successful shortcut(")
				const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) +1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("Successful shortcut!");
				interaction.message.edit({embeds: [receivedEmbed],components:[JourneyMenu]});
			}
		}
		if(interaction.customId==='firstpage')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
			var username = embedjson.author.name;
			var newEmbed = displayBox(username,1);
			interaction.message.edit(newEmbed);
		}
		if(interaction.customId==='prevpage')
		{
			var embedjson = interaction.message.embeds[0].toJSON()
            var username = embedjson.author.name;
			pageInfo = embedjson.footer.text;
			var pages = pageInfo.split("of").map(pages => parseInt(pages))
			console.log(pages);
			var prevPage = pages[0] -1;
			if(prevPage < 1)
			{
			prevPage = 1;
			}
		var newEmbed = displayBox(username,prevPage);
		interaction.message.edit(newEmbed);
		}
		if(interaction.customId==='nextpage')
		{	
			var embedjson = interaction.message.embeds[0].toJSON()
            var username = embedjson.author.name;
			var pageInfo = embedjson.footer.text;
			var pages = pageInfo.split("of").map(pages => parseInt(pages))
			console.log(pages);
			var nextPage = pages[0] + 1;
			var lastPage = pages[1]
			if(nextPage > lastPage)
			{
			nextPage = lastPage;
			}
		var newEmbed = displayBox(username,nextPage);
		interaction.message.edit(newEmbed);
		}
		if(interaction.customId==='lastpage')
		{
var embedjson = interaction.message.embeds[0].toJSON()
            var username = embedjson.author.name;
			pageInfo = embedjson.footer.text;
			var pages = pageInfo.split("of").map(pages => parseInt(pages))
			console.log(pages);
			var lastPage = pages[1]
		var newEmbed = displayBox(username,lastPage);
		interaction.message.edit(newEmbed);
		}
		if(interaction.customId==='closebox')
		{
		interaction.message.delete();
		}
		if(interaction.customId==='obstacle')
		{
			var obstacleroll = (Math.floor(Math.random()*20)+1)
			if(obstacleroll >=10)
			{
				const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("Successfully got past the obstacle!")
				interaction.message.edit({components:[JourneyMenu]});
			}
			else
			{
				interaction.message.reply("Couldn't get through the obstacle.");
			}
		}
		if(interaction.customId==='failobstacle')
		{
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);	
			interaction.message.edit({embeds:[receivedEmbed],components:[JourneyMenu]});
		}
		if(interaction.customId==='discover' || interaction.customId === 'fight')
		{
			interaction.message.reply(("<@&975618877734146068>"));
		}
		if(interaction.customId==='stuckinmud')
		{
			console.log("Stuck In Mud!")
			var navroll = (Math.floor(Math.random()*20)+1)
			console.log(navroll)
			if(navroll>=10)
			{
					console.log("Broke out!")
				const JourneyMenu = new ActionRowBuilder()	
					.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
						);
				interaction.message.reply("No problem breaking out of the mud!")
				interaction.message.edit({components:[JourneyMenu]});
			}
			else
			{
				console.log("Failed to break out of the mud :(")
				const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if(field.name == 'Progress')
				{
					field.name=='Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Next stop!')
					.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("Failed to navigate correctly...");
				interaction.message.edit({embeds: [receivedEmbed],components:[JourneyMenu]});
			}
		}
		if(interaction.customId==='ducklettattack')
		{
			console.log("Ducklett Attack!")
			var navroll = (Math.floor(Math.random()*20)+1)
			console.log(navroll)
			if(navroll>=10)
			{
					console.log("Broke out!")
				const JourneyMenu = new ActionRowBuilder()	
					.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
						);
				interaction.message.reply("Escaped from the Ducklett")
				interaction.message.edit({components:[JourneyMenu]});
			}
			else
			{
				console.log("Failed to escape the Ducklett")
				var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "special", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('wonbattle')
					.setLabel('I won the battle!')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('lostbattle')
					.setLabel('I lost the battle...')
					.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({components: [newMenu]});	
			}
		}

		if (interaction.customId === 'train')
		{
			console.log("TRAIN!")
			var navroll = (Math.floor(Math.random() * 20) + 1)
			console.log(navroll)
			if (navroll >= 5) {
				console.log("Broke out!")
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("You dodged right out of the way, with no problems!")
				interaction.message.edit({ components: [JourneyMenu] });
			}
			else {
				console.log("You got hit by a train!!")
				const receivedEmbed = interaction.message.embeds[0];
				receivedEmbed.fields.forEach(field => {
					lostProgress = parseInt(field.value) - 1
					if (field.name == 'Progress') {
						field.name == 'Progress'
						field.value = lostProgress.toString()
					}
				})
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("You got out of the way of the train, but you fell in the process");
				interaction.message.edit({ embeds: [receivedEmbed], components: [JourneyMenu] });
			}
		}
		if (interaction.customId === 'fakeball') {
			console.log("Is it real?")
			var navroll = (Math.floor(Math.random() * 20) + 1)
			console.log(navroll)
			if (navroll >= 10) {
				console.log("It's a real Pokeball!")
				const itemEmbed = new EmbedBuilder()
					.setTitle("Poke Ball")
				const itemImage = './Items/Poke Ball.png'
				console.log(itemImage);
				const itemFile = new AttachmentBuilder(itemImage, { name: 'item.png' });
				itemEmbed.setImage('attachment://item.png');
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
				);
				
				interaction.message.reply({content: "Obtained a Pokeball!",embeds:[itemEmbed],files:[itemFile]})
				interaction.message.edit({components: [JourneyMenu]});
			}
			else {
				console.log("Failed to escape the Ducklett")
				var embedjson = interaction.message.embeds[0].toJSON()
				encounterlocation = embedjson.author.name;
				numberofbadges = embedjson.footer.text;
				var pokemonembed = encounter(encounterlocation, "special", numberofbadges);
				interaction.reply(pokemonembed);
				newMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('wonbattle')
							.setLabel('I won the battle!')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('lostbattle')
							.setLabel('I lost the battle...')
							.setStyle(ButtonStyle.Danger),
				);
				interaction.message.reply("It wasn't a Pokeball!")
				interaction.message.edit({ components: [newMenu] });
			}
		}
		if (interaction.customId === 'oldRod') {
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "oldrod", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('wonbattle')
						.setLabel('I won the battle!')
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('lostbattle')
						.setLabel('I lost the battle...')
						.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({ components: [newMenu] });
		}	
		if (interaction.customId === 'goodRod') {
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "goodrod", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('wonbattle')
						.setLabel('I won the battle!')
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('lostbattle')
						.setLabel('I lost the battle...')
						.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({ components: [newMenu] });
		}
		if (interaction.customId === 'superRod') {
			var embedjson = interaction.message.embeds[0].toJSON()
			encounterlocation = embedjson.author.name;
			numberofbadges = embedjson.footer.text;
			var pokemonembed = encounter(encounterlocation, "superrod", numberofbadges);
			interaction.reply(pokemonembed);
			newMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('wonbattle')
						.setLabel('I won the battle!')
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('lostbattle')
						.setLabel('I lost the battle...')
						.setStyle(ButtonStyle.Danger),
				);
			interaction.message.edit({ components: [newMenu] });
		}	
		if (interaction.customId === 'distressedmon')
		{
			if (interaction.member.roles.cache.some(r => r.name === "Restoration Corporation")) {
				reputationadd("corp", 20);
			}
			else if (interaction.member.roles.cache.some(r => r.name === "Team Knight")) {
				reputationadd("knight", 20);
			}
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if (field.name == 'Progress') {
					field.name == 'Progress'
					field.value = lostProgress.toString()
				}
			})
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
				);
			interaction.message.edit({ embeds: [receivedEmbed], components: [JourneyMenu] });
			interaction.message.reply("Surely this small act of kindness will pay off somehow...")
		}
		if (interaction.customId === 'fomelquest'||interaction.customId==='daffodilquest') {
			var questID = "218031294209064962"
			interaction.message.reply(`<@${questID}>`);
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
			);
			interaction.message.edit({ components: [JourneyMenu] });
		}
		if (interaction.customId === 'bolettaquest') {
			var questID = "403812429185810432"
			interaction.message.reply(`<@${questID}>`);
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
				);
			interaction.message.edit({ components: [JourneyMenu] });
		}
		if (interaction.customId === 'shipinvestigate') {
			var questID = "232689259902009355"
			interaction.message.reply(`<@${questID}>`);
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
				);
			interaction.message.edit({ components: [JourneyMenu] });
		}
		if (interaction.customId === 'junkinvestigate') {
			var embedjson = interaction.message.embeds[0].toJSON()
			const receivedEmbed = interaction.message.embeds[0];
			receivedEmbed.fields.forEach(field => {
				lostProgress = parseInt(field.value) - 1
				if (field.name == 'Progress') {
					field.name == 'Progress'
					field.value = lostProgress.toString()
				}
			})
			var digroll = (Math.floor(Math.random() * 20) + 1)
			if (digroll <= 18) {
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('junkinvestigate')
							.setLabel("Keep digging!")
							.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Give up!')
							.setStyle(ButtonStyle.Danger),
					);
				interaction.message.edit({ embeds: [receivedEmbed], components: [JourneyMenu] });
			}
			else
			{
				var questID = "403812429185810432"
				interaction.message.reply(`<@${questID}>`);
				interaction.reply("Found a keigi piece!")
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
					);
				interaction.message.edit({ components: [JourneyMenu] });
			}
		}
		if (interaction.customId === 'search') {
			console.log("Looking for a phone!")
			var navroll = (Math.floor(Math.random() * 20) + 1)
			console.log(navroll)
			if (navroll >= 5) {
				console.log("Found it")
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("You found Dorothea's phone!")
				interaction.message.edit({ components: [JourneyMenu] });
			}
			else {
				console.log("Not here")
				const JourneyMenu = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('nexthappening')
							.setLabel('Next stop!')
							.setStyle(ButtonStyle.Primary),
					);
				interaction.message.reply("It doesn't seem to be here, you'll have to move on...");
				interaction.message.edit({components: [JourneyMenu] });
			}
		}
		if (interaction.customId === 'gimmighoul') {
			console.log("Got some Gimmighoul Coins!")
			const itemEmbed = new EmbedBuilder()
				.setTitle("Gimmighoul Coin")
			const itemImage = './Items/Gimmighoul Coin.png'
			console.log(itemImage);
			const itemFile = new AttachmentBuilder(itemImage, { name: 'item.png' });
			itemEmbed.setImage('attachment://item.png');
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
				);

			interaction.message.reply({ content: "Obtained a Gimmighoul Coin!", embeds: [itemEmbed], files: [itemFile] })
			interaction.message.edit({ components: [JourneyMenu] });
        }
		if (interaction.customId === 'eatsnow') 
		{
			interaction.message.reply("Now your mouth is cold. Idiot.")
			const JourneyMenu = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('nexthappening')
						.setLabel('Next stop!')
						.setStyle(ButtonStyle.Primary),
				)
			interaction.message.edit({components: [JourneyMenu] });
		}

		if(interaction.customId.startsWith("pokemon")){
		console.log("The party pokemon button was pressed!")
		var x = parseInt(interaction.customId.substring(7))
		 console.log(x);
			receivedEmbed = interaction.message.embeds[0].toJSON();
			var trainerName = receivedEmbed.author.name;
			jsonstring = './commands/Functions/Users/' + trainerName + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
			var pokemonName = playerJSON.party[x][0];
			var pokemonNickname = playerJSON.party[x][1];
			var pokemonGender = playerJSON.party[x][2];
			var pokemonAbility = playerJSON.party[x][3];
			var metLocation = playerJSON.party[x][4];
			var pokemonLevel = playerJSON.party[x][5];
			var expPoints = playerJSON.party[x][6];
			var levelingRate = playerJSON.party[x][7];
			var pokemonNature = playerJSON.party[x][15];
			var pokemonID = playerJSON.party[x][22];
			var pokemonfriendship = playerJSON.party[x][8];
			console.log(pokemonfriendship)
			var y = 16;
			var IVString = "";
			while(y<22)
			{
			IVString += playerJSON.party[x][y];
				if(y!=21)
				{
				IVString += "/"
				}
				y++
			}
			jsongrowth = './commands/Functions/growthrates.json'
		var growthRates = require(jsongrowth);
			switch(levelingRate)
		{
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
				.setAuthor({name:trainerName})
				.addFields({name:"Name",value:pokemonName,inline:true},{name:"Gender",value:pokemonGender,inline:true},{name:"ID",value:pokemonID,inline:true})
				.addFields({name:"Ability",value:pokemonAbility,inline:true},{name:"Exp. Points",value: expPoints,inline:true},{name:"To Next Lv.",value:toNextLevel.toString(),inline:true})
				.addFields({name:"Nature",value:pokemonNature,inline:true},{name:"Met in",value:metLocation,inline:true},{name:"IVs",value:IVString,inline:true})
				.addFields({name:"HP EVs",value:playerJSON.party[x][9],inline:true},{name:"Atk EVs",value:playerJSON.party[x][10],inline:true},{name:"Def EVs",value:playerJSON.party[x][11],inline:true})
				.addFields({name:"SpA EVs",value:playerJSON.party[x][12],inline:true},{name:"SpD EVs",value:playerJSON.party[x][13],inline:true},{name:"Spe EVs",value:playerJSON.party[x][14],inline:true})

			if (parseInt(pokemonfriendship) == 0) {
				pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" + "You aren't getting along, are you? It doesn't look like it's having fun even when you're together."})
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
				pokemonEmbed.setFooter({ text: "(" + pokemonfriendship + ")" +  "What great friends you are! It's so nice how you trust each other! It makes me kinda jealous!" })
            }
			console.log(pokemonEmbed)
			interaction.reply({embeds:[pokemonEmbed]});
				

		}
	}
});
	
client.on(Events.InteractionCreate, interaction =>{
	if(interaction.isStringSelectMenu())
	{
		console.log("Something was selected");
		if(interaction.customId==='beginningselect')
		{
			var interactionjson = interaction.toJSON();
			var embedjson = interaction.message.embeds[0].toJSON()
			console.log(embedjson);
			locationName = embedjson.author.name;
			jsonstring = './commands/Functions/Locations/Routes/'+ locationName+ '.json'
			var locationJSON = require(jsonstring);
			var beginning = interactionjson.values[0];
			var destination = interactionjson.values[1];
			var goalslist = locationJSON.goals;
			var actionsRequired = "0";
			var x = 0;
			while(x<goalslist.length)
			{
				console.log("Looking for the route");
				if(goalslist[x][0] === beginning&&goalslist[x][1]===destination)
				{
					actionsRequired = goalslist[x][2];
				}
				x++
			}
			var progress = "0"
			const journeyEmbed = new EmbedBuilder()
				.setTitle(embedjson.title)
				.setDescription(embedjson.description)
				.setColor(embedjson.color)
				.setAuthor(embedjson.author)
				.setFooter(embedjson.footer)
				.addFields({name:'Beginning',value:beginning,inline:true},{name:'Destination',value:destination,inline:true},{name:"\u200B",value:"\u200B",inline:true});
			journeyEmbed.addFields({name:'Progress',value: progress, inline:true},{name:'Goal',value: actionsRequired,inline:true},{name:"\u200B",value:"\u200B",inline:true});
			const JourneyMenu = new ActionRowBuilder()	
			.addComponents(
				new ButtonBuilder()
					.setCustomId('nexthappening')
					.setLabel('Start Journey!')
					.setStyle(ButtonStyle.Primary),
					);
			interaction.message.reply("Found your route...get ready for a journey!");
			interaction.message.edit({embeds:[journeyEmbed],components:[JourneyMenu]})
			
		}
		if(interaction.customId==='select')
		{
		var embedjson = interaction.message.embeds[0].toJSON()
		console.log(embedjson);
		if(embedjson.title.startsWith("#"))
		{
			console.log("It starts with a #")
			var pokemonName = embedjson.title.substring(5);
		}
		else
		{
			console.log("It's a shiny so it doesn't start with a #")
			var og = embedjson.title;
			console.log(og)
			var hashIndex = og.indexOf("#");
			console.log("The # is at index" + hashIndex)
			if(hashIndex !== -1)
			{
				console.log("The hash exists!");
				var whiteSpaceIndex = og.indexOf(" ",hashIndex);
				console.log("The space after the # is at "+ whiteSpaceIndex)
				if(whiteSpaceIndex!==-1)
				{
					console.log("The space exists")
					var numberString = og.substring(hashIndex+1,whiteSpaceIndex);
					console.log("numberString is " + numberString)
					var numberToRemove = parseInt(numberString);
					console.log("numbertoRemove is " + numberToRemove);
					var firstHalf = og.slice(0,hashIndex)
					console.log(firstHalf)
					var secondHalf = og.slice(whiteSpaceIndex);
					console.log(secondHalf)
					var pokemonName = firstHalf + secondHalf;
					console.log("name is" + pokemonName)
				}
			}
		}
		console.log(pokemonName)
		var encounterLocation = embedjson.fields[0].value
		console.log(encounterLocation)
		var encounterType = embedjson.fields[1].value
		console.log(encounterType)
		var pokemonLevel = embedjson.fields[3].value
		console.log(pokemonLevel)
		var pokemonGender = embedjson.fields[4].value
		var pokemonTypes = embedjson.fields[5].value
		var pokemonAbility = embedjson.fields[6].value
			var pokemonNature = embedjson.fields[9].value
			var EVstring = embedjson.fields[11].value
		console.log(pokemonTypes)
		var catchingDifficulty = embedjson.fields[13].value
		console.log(catchingDifficulty)
			var levelingRate = embedjson.fields[15].value
			if (embedjson.fields.length = 18) {
				var basefriendship = embedjson.fields[17].value
			}
			else {
				var basefriendship = 50;
            }
		jsonstring = './commands/Functions/growthrates.json'
			var growthRates = require(jsonstring);
		
		var expAtLevel = [1,2,3];
		switch(levelingRate)
		{
			case "Erratic":
			expAtLevel = growthRates.erratic;
			console.log(expAtLevel)
			break;
			case "Fast":
			expAtLevel = growthRates.fast;
			console.log(expAtLevel)
			break;
			case "Medium Fast":
			expAtLevel = growthRates.mediumfast;
			console.log(expAtLevel)
			break;
			case "Medium Slow":
			expAtLevel = growthRates.mediumslow;
			console.log(expAtLevel)
			break;
			case "Slow":
			expAtLevel =growthRates.slow;
			console.log(expAtLevel)
			break;
			case "Fluctuating":
			expAtLevel = growthRates.fluctuating;
			console.log(expAtLevel)
			break;
			default:
			break;
		}
		var BaseEXPYield = embedjson.fields[16].value
		var caughtPokemonEXP = expAtLevel[parseInt(pokemonLevel-1)];
		console.log(caughtPokemonEXP)
		expString = caughtPokemonEXP.toString();

		var pokemonIVs = embedjson.fields[10].value;
		const IVs = pokemonIVs.split("/").map(num => parseInt(num));
		var HPIV = IVs[0];
		var ATKIV = IVs[1];
		var DEFIV = IVs[2];
		var SPAIV = IVs[3];
		var SPDIV = IVs[4];
		var SPEIV = IVs[5];
		}
		if(interaction.values.toString()==='Poke Ball'||interaction.values.toString()==='Premier Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1)+0;
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);
				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}
				if(playerJSON.party.length < 6)
				{
				playerJSON.party.push([pokemonName,pokemonName,pokemonGender,pokemonAbility,encounterLocation,pokemonLevel,expString,levelingRate,basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Great Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1)+5;
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);
				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				
				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				jsonStr = JSON.stringify(playerJSON)
				playerJSON.pokemonCaught++;
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Ultra Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1)+10;
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);
				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Dive Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1);
			if(encounterType === "water"||encounterType === "oldrod"||encounterType==="goodrod"||encounterType==="superrod")
			{
				catchroll+=10;
			}
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);
				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Dusk Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1);
			if(encounterLocation ==="PetrichorHollow"||encounterLocation==="ReverbCave"||encounterLocation==="TandoorCavern"||encounterLocation==="VictoryRoad")
			{
				catchroll+=10;
				interaction.message.edit({components: []})
			}
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);

				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Nest Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1);
			if(pokemonLevel<30)
			{
				catchroll+=10;
			}
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);

				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Luxury Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1)+5;
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);

				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
				playerJSON.party.push([pokemonName,pokemonName,pokemonGender,pokemonAbility,encounterLocation,pokemonLevel,expString,levelingRate,"200","1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
				playerJSON.box.push([pokemonName,pokemonName,pokemonGender,pokemonAbility,encounterLocation,pokemonLevel,expString,levelingRate,"200","1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
		if(interaction.values.toString()==='Net Ball')
		{
			var catchroll = (Math.floor(Math.random()*20)+1);
			if(pokemonTypes.includes("Bug")||pokemonTypes.includes("Water"))
			{
				catchroll+=10;
				console.log("Bonus applied!")
			}
			console.log(catchroll);
			if(catchroll>=catchingDifficulty)
			{
				var xpgained = experience(pokemonLevel, interaction.user.username, BaseEXPYield);

				giveEVs(interaction.user.username, EVstring)
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
				var message = "Gotcha! " + pokemonName + " was caught!" + " Your party gained " + xpgained + "XP!"
				var y =0
			while(y<playerJSON.party.length)
				{
				var leveledUp = checkLeveledUp(interaction.user.username, y)
				message += leveledUp;
				y++;
				}
				interaction.reply({content:message});
				interaction.message.edit({components: []})
				jsonstring = './commands/Functions/Users/' + interaction.user.username + '.json';
				const data = fs.readFileSync(jsonstring,
				 {encoding:'utf8', flag:'r'});
				playerJSON = JSON.parse(data);
				pokemonCaught = playerJSON.pokemonCaught;
				if(pokemonName.startsWith(":"))
				{
				var pokemonID= pokemonName.substring(24)+pokemonCaught
				}
				else
				{
				var pokemonID = pokemonName + pokemonCaught
				}

				if(playerJSON.party.length < 6)
				{
					playerJSON.party.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
				else
				{
					playerJSON.box.push([pokemonName, pokemonName, pokemonGender, pokemonAbility, encounterLocation, pokemonLevel, expString, levelingRate, basefriendship,"1","1","1","1","1","1",pokemonNature,HPIV,ATKIV,DEFIV,SPAIV,SPDIV,SPEIV,pokemonID])
				playerJSON.pokemonCaught++;
				jsonStr = JSON.stringify(playerJSON)
				fs.writeFileSync(jsonstring,jsonStr);
				}
			}
			else
			{
				interaction.reply({content:"Oh no! The Pokemon broke free!"});
			}
		}
	}
});