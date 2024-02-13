/**
 * @file Orders services
 * @author Daniela Cordoba
 */

import { error, success} from '../utils/response.js';
import { getAllOrders, getFilteredOrders, getOrderById, getOrdersByReference, updateOrder } from '../db/orders.db.js';
import { Status_Codes } from '../utils/constants.js';

let getAllOrdersService = async(req, res) => {
  try {
    const orders = await getAllOrders();

    return success(res, Status_Codes.Ok, orders);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

let getFilteredOrdersService = async(req, res) => {
  try {
    const filteredOrders = await getFilteredOrders();

    return success(res, Status_Codes.Ok, filteredOrders);
  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

let getOrderbyIdService = async(req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await getOrderById(orderId);

    return success(res, Status_Codes.Ok, order);

  } catch(err) {
    console.log(err);
    
    return error(res, Status_Codes.BadRequest, err);
  }
}

let getOrdersByReferenceService = async(req, res) => {
  try {
    const filteredOrders = await getOrdersByReference(req.body.searchTerm);

    return success(res, Status_Codes.Ok, filteredOrders);
  } catch (err) {
    console.log(err);
    
    return error(res, Status_Codes.BadRequest, err);
  }
}

let updateOrderField = async(req, res) => {
  try {
    const orderId = req.params.orderId;

    const body = { $set: req.body }
    await updateOrder(orderId, body);

    return success(res, Status_Codes.Ok);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

export { 
  getAllOrdersService,
  getFilteredOrdersService,
  getOrderbyIdService,
  getOrdersByReferenceService,
  updateOrderField }