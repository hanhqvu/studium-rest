const express = require("express");

const router = express.Router();
const userModel = require("../models/userModel");

router.post("/", async (req, res) => {
    try {
        await userModel.addUser(req.body);
        res.sendStatus(204).end();
    } catch (err) {
        console.log(err);
        res.sendStatus(404).end();
    }
});

module.exports = router;
