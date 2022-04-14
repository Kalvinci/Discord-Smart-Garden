const { Client, Intents } = require("discord.js");
const {
	listPlants,
	plantInfo,
	setPlant,
	editPlant,
	removePlant,
	waterPlant,
	lightPlant,
} = require("./commandService");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
	console.log("Bot Ready!");
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = interaction.commandName;
	const options = interaction.options;

	let response = null;

	switch (command) {
		case "list-plants":
			response = await listPlants();
			await interaction.reply(response);
			break;
		case "plant-info":
			response = await plantInfo(options);
			await interaction.reply({ embeds: [response] });
			break;
		case "set-plant":
			response = await setPlant(options);
			await interaction.reply(response);
			break;
		case "edit-plant":
			response = await editPlant(options);
			await interaction.reply(response);
			break;
		case "remove-plant":
			response = await removePlant(options);
			await interaction.reply(response);
			break;
		case "water":
			response = await waterPlant(options);
			await interaction.reply(response);
			break;
		case "light":
			response = await lightPlant(options);
			await interaction.reply(response);
			break;
	}
});

client.login(process.env.TOKEN);
