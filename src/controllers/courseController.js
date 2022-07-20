const express = require("express");

const router = express.Router();

const knex = require("../../db/knex");
const courseModel = require("../models/courseModel");

router.get("/", async (req, res) => {
    try {
        const allCourse = await courseModel.getAll();
        res.send(allCourse).status(200).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.post("/", async (req, res) => {
    const { name, type, dateStart, dateEnd } = req.body;
    const payload = {
        name: name,
        type: type,
        date_start: dateStart,
        date_end: dateEnd,
    };
    try {
        courseModel.addCourse(payload);
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.patch("/:name", async (req, res) => {
    const { name } = req.params;
    const payload = req.body;
    try {
        await courseModel.editCourse(name, payload);
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.delete("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        await courseModel.removeCourse(name);
        res.sendStatus(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

module.exports = router;
