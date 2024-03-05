/**
 * @file Councils collection queries
 * @author Daniela Cordoba
 */

import { connectToDatabase } from "./mongoconnection.js";

async function setCouncils(councils) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('councils');
    await collection.insertMany(councils);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCouncilByCode(councilCode) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('councils');
    const council = await collection.findOne({ code: councilCode });

    return council;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { setCouncils, getCouncilByCode }