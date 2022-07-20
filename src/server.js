const express = require("express");
const knex = require("../db/knex");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/course", async (req, res) => {
    try {
        const allCourse = await knex.select("*").from("course");
        res.send(allCourse).status(200).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

app.post("/api/course", async (req, res) => {
    const { name, type, dateStart, dateEnd } = req.body;
    try {
        await knex("course").insert({
            name: name,
            type: type,
            date_start: dateStart,
            date_end: dateEnd,
        });
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

app.post("/api/course/:name", async (req, res) => {
    const { name } = req.params;
    const edits = req.body;
    try {
        await knex("course").where("name", name).update(edits);
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
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
