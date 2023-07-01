const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const sessionRouter = express.Router();
const url = "mongodb+srv://mk:0pjFrUvCAyoV6GYu@globomantics.o8tj4yx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "globomantics";

const connectToMongoDB = async (callback) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    await callback(db);
    client.close();
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw error;
  }
};

const handleInternalError = (res) => {
  res.status(500).send("Internal Server Error");
};

sessionRouter.route("/")
  .get(async (req, res) => {
    try {
      await connectToMongoDB(async (db) => {
        const sessions = await db.collection("sessions").find().toArray();
        res.render("sessions", { sessions });
      });
    } catch (error) {
      handleInternalError(res);
    }
  });

sessionRouter.route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      await connectToMongoDB(async (db) => {
        const session = await db.collection("sessions").findOne({ _id: new ObjectId(id) });
        res.render("session", { session });
      });
    } catch (error) {
      handleInternalError(res);
    }
  });

module.exports = sessionRouter;
