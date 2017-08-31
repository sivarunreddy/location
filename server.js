const express = require("express");
const path = require("path");

const app = express();

const serverRootPath = path.normalize(`${__dirname}/`);

app.use(express.static(`${serverRootPath}/assets`));

app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use("/assets/*", (req, res) => {
    res.sendFile(`${serverRootPath}/${req.baseUrl}`);
});

app.get("*", (req, res) => {
    res.sendFile(`${serverRootPath}/index.html`);
});

const PORT =  process.argv[2] || 8081;
app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`);});