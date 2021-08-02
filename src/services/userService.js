/**
 * Faking The APIs with JSON file
 */
import Route from "../assets/JsonStore";


/**
 * Dynamic end-point serive for Select Dropdown 
 */
export const getInfiniteRecords = (endPoint, options) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Route(endPoint, options));
    } catch (error) {
      reject(error);
    }
  });
};

export const getDetailByUserId = (id) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        Route("getDetailByUserId", {
          id: id,
        })
      );
    } catch (error) {
      reject(error);
    }
  });
};
