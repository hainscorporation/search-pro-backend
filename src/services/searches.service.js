/**
 * @file Searches services
 * @author Daniela Cordoba
 */

import { getSearchesByCouncil } from "../db/searches.db.js";
import { getCouncilByCode } from "../db/councils.db.js";
import { Status_Codes } from "../utils/constants.js";
import { error, success } from "../utils/response.js";

let getSearchesByCouncilService = async(req, res) => {
  try {
    const councilCode = req.body.councilCode;
    const council = await getCouncilByCode(councilCode);
    const availableSearches = await getSearchesByCouncil(council._id);

    return success(res, Status_Codes.Ok, availableSearches);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

export {
  getSearchesByCouncilService
}