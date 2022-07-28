const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userModel = require("../models/userModel");

router.get("/", async (req, res) => {
    try {
        const allUsers = await userModel.getAll();
        res.send(allUsers).status(204).end();
    } catch (err) {
        res.sendStatus(404).end();
    }
});

router.post("/sign-up", async (req, res) => {
    try {
        await userModel.addUser(req.body);
        res.sendStatus(204).end();
    } catch (err) {
        console.log(err);
        res.sendStatus(404).end();
    }
});

router.get("/:user_name", async (req, res) => {
    try {
        const user = await userModel.getOne(req.params.user_name);
        res
            .send(user.user_name)
            .status(200)
            .end();
    } catch (err) {
        console.log(err);
        res.sendStatus(404).end();
    }
});

router.post("/log-in", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const validate = userModel.validate(userName, password);
        if (validate) {
            const token = jwt.sign(
                { data: userName, exp: 3600 },
                process.env.PRIVATE_KEY,
            );
            res
                .cookie("token", token, { httpOnly: true })
                .status(200)
                .end();
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(404).end();
    }
});

module.exports = router;
