const express = require("express");
const path = require("path");

const app = express();

const serverRootPath = path.normalize(`${__dirname}/`);

app.use(express.static(`${serverRootPath}/assets`));

app.use("/assets/*", (req, res) => {
    res.sendFile(`${serverRootPath}/${req.baseUrl}`);
});

app.get("*", (req, res) => {
    res.sendFile(`${serverRootPath}/index.html`);
});

app.listen("8081",()=>{console.log(`Server started..`);});