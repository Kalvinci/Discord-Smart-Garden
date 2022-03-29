const express = require("express");
require("./bot");

const app = express();
const port = process.env.port || 3000;

app.get("/", (req, res) => {
	res.send("Bot Server running :)");
});

app.listen(port);
