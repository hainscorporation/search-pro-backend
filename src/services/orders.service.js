/**
 * @file Orders services
 * @author Daniela Cordoba
 */

import { error, success} from '../utils/response.js';
import { getOrders, getOrderById, updateOrder } from '../db/orders.db.js';
import { Status_Codes } from '../utils/constants.js';

let getOrdersService = async(req, res) => {
  try {
    const orders = await getOrders();

    return success(res, Status_Codes.Ok, orders);

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

let updateOrderedDateService = async(req, res) => {
  try {
    const orderId = req.params.orderId;
    const newOrderedDate = req.body.ordered;

    const body = { $set: { ordered: newOrderedDate } }
    await updateOrder(orderId, body);

    return success(res, Status_Codes.Ok);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

let updateResultsSentDateService = async(req, res) => {
  try {
    const orderId = req.params.orderId;
    const newResultSentDate = req.body.resultSent;

    const body = { $set: { resultSent: newResultSentDate } }
    await updateOrder(orderId, body);

    return success(res, Status_Codes.Ok);

  } catch (err) {
    console.log(err);

    return error(res, Status_Codes.BadRequest, err);
  }
}

export { getOrdersService, getOrderbyIdService, updateOrderedDateService, updateResultsSentDateService }