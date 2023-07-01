const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path")

const app = express();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname,"/public/")));


app.get("/",(req,res)=>{
    res.send("Hello from my app!");
})

const PORT = 3002;
app.listen(PORT,()=>{
    debug(`listening on port ${chalk.green(PORT)}`);
});