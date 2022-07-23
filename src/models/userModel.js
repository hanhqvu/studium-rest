const argon2 = require("argon2");
const knex = require("../../db/knex");

module.exports = {
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
};
