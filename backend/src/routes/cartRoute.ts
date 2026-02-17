import express from 'express'
import { addItemToCart, cheakout, clearCart, DeleteItemInCart, getActiveCartForUser, UpdetedItemcart } from '../services/cartServices.js';
import validateJWT from '../middellwears/validateJWT.js';
import type { ExtendeRequst } from '../types/ExtendeRequst.js';


const router = express.Router();


router.get('/', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id
        const cart = await getActiveCartForUser({ userId });
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send("something went worng!")
    }

})

router.delete('/', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id;
        const response = await clearCart({ userId });
        res.status(response.statusCode ?? 200).send(response.data);
    } catch (err) {
        res.status(500).send("something went worng!");
    }
})

router.post('/items', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id
        const { productId, quantity } = req.body;
        const response = await addItemToCart({ userId, productId, quantity });
        res.status(response.statusCode ?? 200).send(response.data);
    } catch (err) {
        res.status(500).send("something went worng!");
    }

})

router.put('/items', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id
        const { productId, quantity } = req.body;
        const response = await UpdetedItemcart({ userId, productId, quantity });
        res.status(response.statusCode ?? 200).send(response.data);
    } catch (err) {
        res.status(500).send("something went worng!");
    }

})

router.delete('/items/:productId', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const response = await DeleteItemInCart({ userId, productId });
        res.status(response.statusCode ?? 200).send(response.data);
    } catch (err) {
        res.status(500).send("something went worng!");
    }

})

router.post('/cheakout', validateJWT, async (req: ExtendeRequst, res) => {
    try {
        const userId = req.user._id;
        const { address } = req.body;
        const response = await cheakout({ userId, address });
        res.status(response.statusCode ?? 200).send(response.data);
    } catch (err) {
        res.status(500).send("something went worng!");
    }

})



export default router;