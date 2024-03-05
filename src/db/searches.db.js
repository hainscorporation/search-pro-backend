/**
 * @file Searches collection queries
 * @author Daniela Cordoba
 */

import { connectToDatabase } from "./mongoconnection.js";

async function getSearchesByCouncil(councilId) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('searches');

    const query = { 
      "details": { 
        "$elemMatch": { 
          "council": councilId.toString()
        } 
      } 
    };

    const availableSearches = await collection.find(query).toArray();
    return availableSearches;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export { getSearchesByCouncil }