const path = require("path");
const express = require("express");
app = express();
const port = process.env.PORT;
const pathfile = path.join(__dirname, "/src");
console.log(pathfile);
app.use(express.static(pathfile));
app.get("", (req, res) => {
	res.send("food recipe website");
});
app.listen(port, () => {
	console.log("server is up on port 4000");
});
