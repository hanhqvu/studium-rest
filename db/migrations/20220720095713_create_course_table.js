/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("course", (table) => {
        table.increments("id").primary();
        table.string("name", 32).notNullable().index();
        table.date("date_start", 32);
        table.date("date_end", 32);
        table.string("type", 32).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("course");
};
