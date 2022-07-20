const express = require("express");
const knex = require("../../db/knex");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allCourse = await knex.select("*").from("course");
        res.send(allCourse).status(200).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.post("/", async (req, res) => {
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

router.patch(":name", async (req, res) => {
    const { name } = req.params;
    const edits = req.body;
    try {
        await knex("course").where("name", name).update(edits);
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.delete("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        await knex("course").where("name", name).del();
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

module.exports = router;
