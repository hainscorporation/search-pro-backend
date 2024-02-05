/**
 * @file Mongodb connection
 * @author Daniela Cordobs
 */

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config(); 

const mongoURI = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('surch-it');
  cachedDb = db;
  return db;
}

export { connectToDatabase };