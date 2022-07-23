/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable("user", (table) => {
        table
            .uuid("user_uid")
            .primary()
            .notNullable()
            .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("user-name", 32);
        table.string("password", 50);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("user");
};
