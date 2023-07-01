const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();

adminRouter.route("/").get(async (req, res) => {
    const url = "mongodb+srv://mk:0pjFrUvCAyoV6GYu@globomantics.o8tj4yx.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "globomantics";

    try {
        const client = await MongoClient.connect(url);
        debug("Connected to MongoDB");
        const db = client.db(dbName);
        const response = await db.collection("sessions").insertMany(sessions);
        client.close();

        res.json({
            success: true,
            message: "Sessions inserted successfully",
            count: response.insertedCount,
            insertedSessions: response.ops
        });
    } catch (error) {
        debug(error.stack);
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
});

module.exports = adminRouter;
