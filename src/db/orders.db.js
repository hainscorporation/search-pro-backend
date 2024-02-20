/**
 * @file Orders collection queries
 * @author Daniela Cordoba
 */

import { connectToDatabase } from "./mongoconnection.js";
import { ObjectId } from "mongodb";

async function getAllOrders() {
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

async function getFilteredOrders() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    const filteredOrders = await collection.find({
      'ordered': {
        '$exists': false
      }
    }
    ).toArray();

    return filteredOrders;
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

async function getOrdersBySearchTerm(searchTerm) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    const agg = [
      {
        '$search': {
          'index': 'partial_search',
          'compound': {
            'should': [
              {
                'autocomplete': {
                  'path': 'ref', 
                  'query': searchTerm
                }
              },
              {
                'autocomplete': {
                  'path': 'requestedBy', 
                  'query': searchTerm
                }
              },
              {
                'autocomplete': {
                  'path': 'lotonplan', 
                  'query': searchTerm
                }
              }
            ]
          }
        }
      }
    ];

    const filteredOrders = await collection.aggregate(agg).toArray();
    return filteredOrders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function setOrders(orders) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    await collection.insertMany(orders);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOrder(orderId, body) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    await collection.updateOne(
      { _id: new ObjectId(orderId) },
      body
    )
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropOrdersCollection() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('orders');
    await collection.drop();
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getAllOrders,
  getFilteredOrders,
  getOrderById,
  getOrdersBySearchTerm,
  setOrders,
  updateOrder,
  dropOrdersCollection
}