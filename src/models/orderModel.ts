import mongoose,{Schema,Document,type ObjectId} from "mongoose";


export interface IOrderItem {
    productTitle:string;
    productImage:string;
    unitePrice:number;
    quantity:number;
}

export interface IOrder extends Document {
    orderItems:IOrder[];
    total:number;
    address:string;
    userId:ObjectId | string;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productTitle:{type:String,required:true},
    productImage:{type:String,required:true},
    unitePrice:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

const OrderSchema = new Schema<IOrder>({
    orderItems:[OrderItemSchema],
    total:{type:Number,required:true},
    address:{type:String,required:true},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

export const OrderModel = mongoose.model<IOrder>("Order",OrderSchema);