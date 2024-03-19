/**
 * @file API routes definition
 * @author Daniela Cordoba
 */

import express from "express";
import { getAllOrdersService, getFilteredOrdersService, getOrderbyIdService, getOrdersByStatusService, getOrdersBySearchTermService, updateOrderField } from "../services/orders.service.js";
import { seedDB, insertCouncils } from "../services/faker.service.js";
import { getSearchesByCouncilService } from "../services/searches.service.js";

const router = express.Router();

/**
 * Endpoint Get order by id
 */
router.get('/orders/:orderId', getOrderbyIdService)

/**
 * Endpoint Get all orders
 */
router.get('/all-orders', getAllOrdersService)

/**
 * Endpoint Get filtered orders 
 */
router.post('/orders', getFilteredOrdersService)

/**
 * Endpoint Get order by status
 */
router.post('/orders-by-status', getOrdersByStatusService)

/**
 * Endpoint Get filtered orders filtered by reference
 */
router.post('/orders-by-reference', getOrdersBySearchTermService)

/**
 * Endpoint Update order field
 */
router.patch('/orders/:orderId', updateOrderField)

/**
 * Endpoint seed orders
 */
router.get('/seed', seedDB)

/**
 * Endpoint seed councils
 */
router.get('/seed-councils', insertCouncils)

/**
 * Endpoint Get Available searches for a given council
 */
router.post('/available-searches', getSearchesByCouncilService)


export default router;