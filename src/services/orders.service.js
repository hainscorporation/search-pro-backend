/**
 * @file Orders services
 * @author Daniela Cordoba
 */

import { error, success} from '../utils/response.js';
import { getOrders, getOrderById } from '../db/orders.db.js';
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

export { getOrdersService, getOrderbyIdService }