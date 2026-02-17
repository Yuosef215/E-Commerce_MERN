import mongoose, { Schema, Document, type ObjectId } from "mongoose";
import type { IProduct } from "./productModel.js";


const cartStauts = ["active", "completed"];

export interface ICartItem {
    product: IProduct;
    unitePrice: number;
    quantity: number;
}


export interface ICart extends Document {
    userId:ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    stauts: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    unitePrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 }
})

const Cartschema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    stauts: { type: String, enum: cartStauts, default: "active" }

})

export const cartModel = mongoose.model<ICart>("Cart",Cartschema);

