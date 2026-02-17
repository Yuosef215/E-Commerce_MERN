import { cartModel } from "../models/cartModel.js";

interface createCartForUser {
    userId: string;
}

// دي الفانكشن اللي انا هعمل بيها كرت جديده لليوزر جديد
const createCartForUser = async ({ userId }: createCartForUser) => {
    const cart = await cartModel.create({ userId,totalAmount:0 });
    await cart.save();
    return cart;
}

interface getActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: getActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        cart = await createCartForUser({ userId })
    }
    return cart;
}