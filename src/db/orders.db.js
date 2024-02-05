/**
 * @file Orders collection queries
 * @author Daniela Cordoba
 */

import { connectToDatabase } from "./mongoconnection.js";
import { ObjectId } from "mongodb";

async function getOrders() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    const orders = await collection.find({}).toArray();

    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');

    const order = await collection.findOne({ _id: new ObjectId(orderId) }); 

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getOrders, getOrderById }