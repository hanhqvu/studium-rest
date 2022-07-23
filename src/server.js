const express = require("express");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const PORT = process.env.PORT || 3000;
const app = express();
const courseController = require("./controllers/courseController");
const userController = require("./controllers/userController");

app.use(express.json());
app.use("/", express.static("public"));
app.use("/api/course", courseController);
app.use("/api/user", userController);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Studium REST API",
            version: "0.1.0",
            description: "Back-end service for Studium application",
            license: {
                name: "MIT",
            },
        },
    },
    apis: [path.join(__dirname, "/controllers/*.js")],
};

const specs = swaggerJsdoc(options);
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, async () => {
    try {
        console.log(`Server listening on port ${PORT}`);
    } catch (err) {
        console.log(`Server failed to start: ${err}`);
        process.exit(1);
    }
});
