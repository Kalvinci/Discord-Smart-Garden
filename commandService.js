const axios = require("axios");
require("dotenv").config();

const SERVER_URL = process.env.SERVER_URL;

const giphys = [
	"https://c.tenor.com/q2lP9vEriZUAAAAC/party-plants.gif",
	"https://c.tenor.com/7LV6SkvqbG0AAAAC/yay-happy.gif",
	"https://c.tenor.com/XgCIfLJu_e8AAAAC/im-rooting-for-you-believe-in-you.gif",
];

async function listPlants() {
	let response = "";
	try {
		const { data } = await axios.get(`${SERVER_URL}/listplants`);
		response = "Here is the list :smiley:";
		for (const plant of data) {
			response += `\n>> \`Rack ${plant.rackId} has ${plant.name}\``;
		}
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function plantInfo(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const { data } = await axios.get(`${SERVER_URL}/plantinfo/${rackId}`);
		response = {
			color: "0x12e385",
			fields: [
				{
					name: "Rack",
					value: data.rackId.toString(),
					inline: true,
				},
				{
					name: "Name",
					value: data.name,
					inline: true,
				},
				{
					name: "Temperature",
					value: data.temperature.toString(),
					inline: true,
				},
				{
					name: "Humidity",
					value: data.humidity.toString(),
					inline: true,
				},
				{
					name: "Water",
					value: data.water.toString(),
					inline: true,
				},
				{
					name: "Light",
					value: data.light,
					inline: true,
				},
			],
			image: {
				url: "https://www.thespruce.com/thmb/_6OfTexQcyd-3aW8Z1O2y78sc-Q=/2048x1545/filters:fill(auto,1)/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg",
			},
			timestamp: new Date(),
		};
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function setPlant(options) {
	let response = "";
	try {
		const plantDetails = {
			rackId: options.getInteger("rack"),
			name: options.getString("name"),
			temperature: options.getString("temperature"),
			humidity: options.getString("humidity"),
			water: options.getString("water"),
			light: options.getString("light"),
		};
		const { data } = await axios.post(
			`${SERVER_URL}/setplant`,
			plantDetails
		);
		response = {
			content: "Plant set successfully! :smile::potted_plant::thumbsup:",
			embeds: [
				{
					color: "0x12e385",
					fields: [
						{
							name: "Rack",
							value: data.rackId.toString(),
							inline: true,
						},
						{
							name: "Name",
							value: data.name,
							inline: true,
						},
						{
							name: "Temperature",
							value: data.temperature.toString(),
							inline: true,
						},
						{
							name: "Humidity",
							value: data.humidity.toString(),
							inline: true,
						},
						{
							name: "Water",
							value: data.water.toString(),
							inline: true,
						},
						{
							name: "Light",
							value: data.light,
							inline: true,
						},
					],
					image: {
						url: giphys[Math.floor(Math.random() * giphys.length)],
					},
					timestamp: new Date(),
				},
			],
		};
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function removePlant(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const { data } = await axios.post(`${SERVER_URL}/removeplant`, {
			rackId,
		});
		response = {
			content: `${data} :pensive:`,
			embeds: [
				{
					image: {
						url: "https://c.tenor.com/yOVhAId928MAAAAC/hello-l-kitty-pull.gif",
					},
				},
			],
		};
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function editPlant(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const property = options.getString("property");
		const value = options.getString("value");
		const { data } = await axios.post(`${SERVER_URL}/editplant`, {
			rackId,
			updateProperty: {
				[property]: value,
			},
		});
		response = `${data} :thumbsup:`;
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function waterPlant(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const { data } = await axios.post(`${SERVER_URL}/water`, { rackId });
		response = `${data} :droplet: :thumbsup:`;
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function lightPlant(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const state = options.getString("state");
		const { data } = await axios.post(`${SERVER_URL}/light`, {
			rackId,
			state,
		});
		response = `${data} :thumbsup:`;
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

exports.listPlants = listPlants;
exports.plantInfo = plantInfo;
exports.setPlant = setPlant;
exports.removePlant = removePlant;
exports.editPlant = editPlant;
exports.waterPlant = waterPlant;
exports.lightPlant = lightPlant;
