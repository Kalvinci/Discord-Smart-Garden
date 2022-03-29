const express = require("express");
require("./bot");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Bot Server running :)");
});

app.listen(PORT);
