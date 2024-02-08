/**
 * @file API routes definition
 * @author Daniela Cordoba
 */

import express from "express";
import { getOrdersService, getOrderbyIdService, updateOrderField } from "../services/orders.service.js";
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
 * Endpoint Update order field
 */
router.patch('/orders/:orderId', updateOrderField)

/**
 * Endpoint seed database
 */
router.get('/seed', seedDB)


export default router;