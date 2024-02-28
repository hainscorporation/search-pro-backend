/**
 * @file Searches services
 * @author Daniela Cordoba
 */

import { getSearchesByCouncil } from "../db/searches.db.js";
import { Status_Codes } from "../utils/constants.js";
import { error, success } from "../utils/response.js";

let getSearchesByCouncilService = async(req, res) => {
  try {
    const availableSearches = await getSearchesByCouncil();

    return success(res, Status_Codes.Ok, availableSearches);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

export {
  getSearchesByCouncilService
}