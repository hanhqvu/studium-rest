const knex = require("../../db/knex");

module.exports = {
    async getAll() {
        return knex.select("*").from("course");
    },

    async addCourse(payload) {
        await knex("course").insert(payload);
        return "Successfully added new course";
    },

    async editCourse(name, payload) {
        await knex("course").where("name", name).update(payload);
        return "Successfully edit course";
    },

    async removeCourse(name) {
        await knex("course").where("name", name).del();
        return "Successfully delete course";
    },
};
