const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const listplants = new SlashCommandBuilder()
	.setName("list-plants")
	.setDescription("Lists all plants in your Smart Garden")
	.toJSON();

const plantinfo = new SlashCommandBuilder()
	.setName("plant-info")
	.setDescription("Fetches info about your plant")
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.toJSON();

const setplant = new SlashCommandBuilder()
	.setName("set-plant")
	.setDescription("Sets a new plant in your Smart Garden")
	.addStringOption((option) =>
		option
			.setName("name")
			.setDescription("Enter plant name")
			.setRequired(true)
	)
	.addNumberOption((option) =>
		option
			.setName("temperature")
			.setDescription("Enter the required temperature")
			.setRequired(true)
	)
	.addNumberOption((option) =>
		option
			.setName("humidity")
			.setDescription("Enter the required humidity")
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName("water")
			.setDescription("Enter the required water in ml")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("light")
			.setDescription("Choose the required lighting level")
			.setRequired(true)
			.addChoice("Low", "Low")
			.addChoice("Medium", "Medium")
			.addChoice("High", "High")
			.addChoice("Not required", "Not required")
	)
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.toJSON();

const removeplant = new SlashCommandBuilder()
	.setName("remove-plant")
	.setDescription("Removes a plant from your Smart Garden")
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.toJSON();

const editplant = new SlashCommandBuilder()
	.setName("edit-plant")
	.setDescription("Edits plant details")
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("property")
			.setDescription("Choose the property you would like to update")
			.setRequired(true)
			.addChoice("Rack", "rack")
			.addChoice("Name", "name")
			.addChoice("Temperature", "temperature")
			.addChoice("Humidity", "humidity")
			.addChoice("Water", "water")
			.addChoice("Light", "light")
	)
	.addStringOption((option) =>
		option
			.setName("value")
			.setDescription("Set the new appropriate value")
			.setRequired(true)
	)
	.toJSON();

const water = new SlashCommandBuilder()
	.setName("water")
	.setDescription("Water your plant")
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.toJSON();

const light = new SlashCommandBuilder()
	.setName("light")
	.setDescription("Turn ON/OFF lights in a rack")
	.addStringOption((option) =>
		option
			.setName("state")
			.setDescription("Choose the state of the light")
			.setRequired(true)
			.addChoice("ON", "ON")
			.addChoice("OFF", "OFF")
	)
	.addIntegerOption((option) =>
		option
			.setName("rack")
			.setDescription("Enter the rack where the plant is placed")
			.setRequired(true)
	)
	.toJSON();

const commands = [
	listplants,
	plantinfo,
	setplant,
	editplant,
	removeplant,
	water,
	light,
];

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
