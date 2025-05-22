const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 3000; // Changed from 5050 to 3000 for Docker port mapping consistency
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ Use the Docker container name instead of localhost
const MONGO_URL = "mongodb://admin:pass@mongo:27017";
const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db("test-db");
        const data = await db.collection('users').find({}).toArray();

        res.send(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Server error");
    } finally {
        await client.close();
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db("test-db");
        const result = await db.collection('users').insertOne(userObj);
        console.log("Data inserted:", result.insertedId);

        res.send("User added");
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send("Server error");
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
