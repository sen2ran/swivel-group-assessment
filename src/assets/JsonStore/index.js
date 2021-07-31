// import
const organizationsJson = require("./organizations.json");
const usersJson = require("./users.json");
const ticketsJson = require("./tickets.json");

const getAllTimeZones = [...new Set(usersJson.map((user) => user.timezone))];
const getAllTags = [...new Set(usersJson.map((user) => [...user.tags]).flat())];

export {
  organizationsJson,
  usersJson,
  ticketsJson,
  getAllTimeZones,
  getAllTags,
};
