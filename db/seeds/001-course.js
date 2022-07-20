/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("course").del();
  await knex("course").insert([
    {
      id: 1,
      name: "N2 Intensive",
      date_start: "2022-7-9",
      date_end: "2022-11-9",
      type: "JLPT",
    },
    {
      id: 2,
      name: "N2 Lite",
      date_start: "2022-1-9",
      date_end: "2022-10-8",
      type: "JLPT",
    },
    {
      id: 3,
      name: "Travel & Art",
      date_start: "2022-5-8",
      date_end: "2022-7-10",
      type: "Conversation",
    },
    {
      id: 4,
      name: "Beginner",
      date_start: "2022-2-4",
      date_end: "2022-9-1",
      type: "Kanji",
    },
  ]);
};
