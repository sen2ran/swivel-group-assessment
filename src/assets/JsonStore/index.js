/**
 * Faking the APIS calls
 * It'll work as backend
 */
const organizationsJson = require("./organizations.json");
const usersJson = require("./users.json");
const ticketsJson = require("./tickets.json");

const getAllTimeZones = [...new Set(usersJson.map((user) => user.timezone))];
const getAllTags = [...new Set(usersJson.map((user) => [...user.tags]).flat())];
const getFieldList = [
  { name: "Name", id: "name" },
  { name: "Alias", id: "alias" },
  { name: "Email", id: "email" },
  { name: "Phone", id: "phone" },
  { name: "Signature", id: "signature" },
];
const getAllRole = [...new Set(usersJson.map((user) => user.role))];

const paginatedArray = (array, currentPage, pageSize = 10) => {
  return array.slice((currentPage - 1) * pageSize, currentPage * pageSize);
};

/**
 * TODO
 * []Need add regex for remove specal charater for easy search
 *  */
const getFilteredUser = (options) => {
  if (!options.searchValue) {
    return {
      records: paginatedArray(usersJson, options.currentPage),
      pageCount: Math.floor(usersJson.length / 10),
      currentPage: options.currentPage,
      totalCount: usersJson.length,
    };
  } else {
    var tmpUsersJson = usersJson.filter((user) => {
      return (
        user[options.searchBy] &&
        user[options.searchBy]
          .toLowerCase()
          .match(options.searchValue.toLowerCase())
      );
    });
    return {
      records: paginatedArray(tmpUsersJson, options.currentPage),
      pageCount: Math.floor(tmpUsersJson.length / 10),
      currentPage: options.currentPage,
      totalCount: tmpUsersJson.length,
    };
  }
};

const getDetailByUserId = (options) => {
  try {
    const singleUser = usersJson.find((user) => options.id == user._id);
    const singleOrganization = organizationsJson.find(
      (organization) => singleUser.organization_id == organization._id
    );
    const tickets = ticketsJson.filter(
      (ticket) => singleUser.organization_id == ticket.organization_id
    );
    return {
      user: singleUser,
      organization: singleOrganization,
      tickets: tickets,
    };
  } catch (error) {
    return "Something went wrong";
  }
};

const Route = (endpoint, options) => {
  switch (endpoint) {
    case "getAllField":
      return {
        records: getFieldList,
        pageCount: 1,
        currentPage: 1,
        totalCount: getFieldList.length,
      };
    case "searchByField":
      return getFilteredUser(options);
    case "getDetailByUserId":
      return getDetailByUserId(options);
    default:
      break;
  }
};

export { getAllTimeZones, getAllTags, getFieldList, getAllRole };

export default Route;
