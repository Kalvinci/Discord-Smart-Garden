require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { listPlants, plantInfo, setPlant } = require("./commandService");

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
	}
});

client.login(process.env.TOKEN);
