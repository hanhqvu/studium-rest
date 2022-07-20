const express = require("express");
const knex = require("../db/knex");

const PORT = process.env.PORT || 3000;
const app = express();
const courseController = require("./controllers/courseController");

app.use(express.json());
app.use("/api/course", courseController);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, async () => {
    try {
        console.log(`Server listening on port ${PORT}`);
    } catch (err) {
        console.log(`Server failed to start: ${err}`);
        process.exit(1);
    }
});
