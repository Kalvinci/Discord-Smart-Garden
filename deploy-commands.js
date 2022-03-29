const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
	new SlashCommandBuilder()
		.setName("list-plants")
		.setDescription("Lists all plants in your Smart Garden"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest.put(
	Routes.applicationGuildCommands(
		process.env.CLIENT_ID,
		process.env.GUILD_ID
	),
	{ body: commands }
)
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
