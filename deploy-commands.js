const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, guildId, clientId } = require("./config.json");

const commands = [
	new SlashCommandBuilder()
		.setName("list-plants")
		.setDescription("Lists all plants in your Smart Garden"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
