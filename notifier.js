const axios = require("axios").default;
require("dotenv").config();

function notify(content) {
	axios
		.post(process.env.DISCORD_WEBHOOK_URL, {
			content,
		})
		.then((discordResponse) => {
			console.log("Success!");
		})
		.catch((err) => console.error(`Error sending to Discord: ${err}`));
}

notify("hey");
