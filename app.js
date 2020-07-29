const path = require("path");
const express = require("express");
app = express();

const pathfile = path.join(__dirname, "/src");
console.log(pathfile);
app.use(express.static(pathfile));
app.get("", (req, res) => {
	res.send("food recipe website");
});
app.listen(9000, () => {
	console.log("server is up on port 4000");
});
