const argon2 = require("argon2");
const knex = require("../../db/knex");

module.exports = {
    async getAll() {
        const allUsers = await knex.select("*").from("users");
        return allUsers;
    },

    async addUser(payload) {
        const { userName, password } = payload;
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 40,
            timeCost: 10,
        });
        await knex("users").insert({
            user_name: userName,
            password: hashedPassword,
        });
        return "Successfully created new user";
    },

    getOne(userName) {
        return knex.select("*").from("users").where(
            "user_name",
            userName,
        ).first();
    },

    async validate(userName, password) {
        const user = await this.getOne(userName);
        if (!user) {
            throw new Error("No user found");
        }
        const validation = await argon2.verify(user.password, password);
        if (!validation) {
            throw new Error("Password Incorrect");
        }
        return validation;
    },

    async editUser(name, payload) {
        await knex("users").where("name", name).update(payload);
        return "Successfully update user";
    },

    async removeUser(name) {
        await knex("users").where("name", name).del();
        return "Successfully delete user";
    },
};
