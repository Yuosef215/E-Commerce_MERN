import express from 'express'
import { addItemToCart, getActiveCartForUser } from '../services/cartServices.js';
import validateJWT from '../middellwears/validateJWT.js';
import type { ExtendeRequst } from '../types/ExtendeRequst.js';


const router = express.Router();


router.get('/',validateJWT,async (req:ExtendeRequst,res) =>{
    const userId = req.user._id
    const cart =await getActiveCartForUser({userId});
    res.status(200).send(cart);
})

router.post('/items',validateJWT,async(req:ExtendeRequst,res) =>{
    const userId = req.user._id
    const {productId,quantity} = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode ?? 200).send(response.data);
})



export default router;