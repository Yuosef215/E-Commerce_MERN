import express from 'express';
import { getAllProducts } from '../services/productServices.js';

const router = express.Router();


router.get('/',async (req,res)=>{
    try {
        const products = await getAllProducts();
    res.status(200).send(products);
    } catch (err) {
        res.status(500).send("something went worng!");
    }
    
})

export default router;