import express from "express";
import  InventoryController  from '../controllers/InventoryController.js';
import rateLimit from 'express-rate-limit'
// We use multer as a middleware for file uploads
import multer from "multer";
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const main_directory = __dirname.toString().replace('/routes', '')

const router = express.Router();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
// name of the file needs to be as the same as the name in our form (in this case 'image')
const upload = multer({ storage: storage }).single('image');

// We cannot use diskupload as it will save image locally only.
// var diskstorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(main_directory, '/public/images'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname) //Appending extension
//   }
// })

// const diskupload = multer({ storage: diskstorage }).single('image');


const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: "Too many accounts created from this IP, please try again after",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false
  });


router.get('/', InventoryController.main_page);
router.get('/signin', InventoryController.signin_get);
router.post('/signin', InventoryController.signin_post);
router.get('/signout', InventoryController.signout);
router.get('/destinations', InventoryController.item_index);
router.get('/new', InventoryController.item_create_get);
router.post('/new',  upload, InventoryController.item_create_post);
router.get('/destinations/:id', InventoryController.item_details);
router.delete('/destinations/:id', InventoryController.item_delete);


export default router;