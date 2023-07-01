const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path")
const sessions = require("./src/data/sessions.json")

const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = express.Router();


app.use(morgan("tiny"));


app.use(express.static(path.join(__dirname, "/public")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

sessionRouter.route("/").get((req, res) => {
    res.render("sessions",{sessions});
})
sessionRouter.route("/1").get((req, res) => {
    res.send("hello single sessions");
})
app.use("/sessions", sessionRouter);
app.get("/", (req, res) => {
    res.render("index", {
        title: "Globomantics",
        data: ['a', 'b', 'c']
    });
})



app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`);
});