const express = require("express");
const knex = require("../db/knex");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/course", async (req, res) => {
    console.log(req.body);
    try {
        const allCourse = await knex.select("*").from("course");
        res.send(allCourse).status(200).end();
    } catch (err) {
        res.send(404).end();
    }
});

app.listen(PORT, async () => {
    try {
        console.log(`Server listening on port ${PORT}`);
    } catch (err) {
        console.log(`Server failed to start: ${err}`);
        process.exit(1);
    }
});
