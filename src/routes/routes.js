/**
 * @file API routes definition
 * @author Daniela Cordoba
 */

import express from "express";
import { getOrdersService, getOrderbyIdService, updateOrderedDateService, updateResultsSentDateService } from "../services/orders.service.js";
import { seedDB } from "../services/faker.service.js";

const router = express.Router();

/**
 * Endpoint Get order by id
 */
router.get('/orders/:orderId', getOrderbyIdService)

/**
 * Endpoint Get all orders
 */
router.get('/orders', getOrdersService)

/**
 * Endpoint Update ordered date
 */
router.patch('/orders/:orderId', updateOrderedDateService)

/**
 * Endpoint Update results sent date
 */
router.patch('/orders/:orderId', updateResultsSentDateService)

/**
 * Endpoint seed database
 */
router.get('/seed', seedDB)


export default router;