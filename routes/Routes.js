import express from "express";
import  InventoryController  from '../controllers/InventoryController.js';
import rateLimit from 'express-rate-limit'

const router = express.Router();

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: "Too many accounts created from this IP, please try again after",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false
  });


router.get('/', InventoryController.main_page);
router.get('/destinations', InventoryController.item_index)
router.get('/new', InventoryController.item_create_get);
router.post('/new', limiter, InventoryController.item_create_post);
router.get('/:id', InventoryController.item_details);
router.delete('/:id', InventoryController.item_delete);

export default router;