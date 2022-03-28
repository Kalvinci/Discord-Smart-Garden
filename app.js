const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
	console.log("Bot Ready!");
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = interaction.commandName;

	if (command === "list-plants") {
		interaction.reply("1. Basil\n2. Snake Plant");
	}
});

client.login(token);
