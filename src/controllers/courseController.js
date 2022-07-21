const express = require("express");

const router = express.Router();
const courseModel = require("../models/courseModel");

/**
 * @swagger
 * /api/course:
 *  get:
 *      description: Get all courses
 *      responses:
 *          200:
 *              description: List of all courses
 *  post:
 *      description: Add a new course
 *      requestBody: 
 *        required: true
 *        description: A JSON object containing pet information
 *        examples: 
 *          name: N2 Part-time
 *          type: JLPT
 *      responses:
 *          204:
 *              description: Course successfully added
 * /api/course/{name}:
 *   patch:
 *      description: Update an existing course
 *      parameters:
 *          - in: path
 *            name: course name
 *            required: true
 *            scheme:
 *              type: string
 *      requestBody: 
 *        required: true
 *        description: A JSON object containing pet information
 *        examples: 
 *          name: N2 Part-time
 *          type: JLPT
 *      responses:
 *          204:
 *              description: Successfully update the existing course
 *          404:
 *              description: Couse was not found
 *   delete:
 *      description: Delete an existing course
 *      parameters:
 *          - in: path
 *            name: course name
 *            required: true
 *            scheme:
 *              type: string
 *      responses:
 *          204:
 *              description: Successfully delete the existing course
 *          404:
 *              description: Couse was not found
 */

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
