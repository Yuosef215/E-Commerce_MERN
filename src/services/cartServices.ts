import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
    userId: string;
}

// دي الفانكشن اللي انا هعمل بيها كرت جديده لليوزر جديد
const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
};

interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
};

interface AddItemToCart {
    productId: any;
    quantity: number;
    userId: string; // ✅ توحيد الاسم
}

type ServiceResponse<T> = {
    statusCode: number;
    data: T;
};

export const addItemToCart = async ({
    productId,
    quantity,
    userId,
}: AddItemToCart): Promise<ServiceResponse<any>> => {
    // ✅ كان غلط قبل كده: getActiveCartForUser بتاخد userId
    const cart = await getActiveCartForUser({ userId });

    // ✅ مقارنة آمنة (عشان ObjectId vs string)
    const existingInCart = cart.items.find(
        (p: any) => String(p.product) === String(productId)
    );

    if (existingInCart) {
        return { data: "Item already exists!", statusCode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
        // ✅ لازم statusCode موجود دايمًا
        return { data: "Product not found!", statusCode: 404 };
    }

    if (product.stock < quantity) {
        return { data: "Low Stock for item", statusCode: 400 };
    }

    // ✅ push الصحيح (لازم object)
    cart.items.push({
        product: productId,
        unitePrice: product.price,
        quantity,
    });

    cart.totalAmount += product.price * quantity;

    const updated = await cart.save();

    return { data: updated, statusCode: 200 };
};
