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

interface ClearCart {
    userId: string
}

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId });

    cart.items = [];
    cart.totalAmount = 0;

    const updetedCart = await cart.save();
    return {data:updetedCart,statusCode: 200};
}

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


    const existingInCart = cart.items.find(
        (p: any) => String(p.product) === String(productId)
    );

    if (existingInCart) {
        return { data: "Item already exists!", statusCode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 404 };
    }

    if (product.stock < quantity) {
        return { data: "Low Stock for item", statusCode: 400 };
    }

    //  push الصحيح (لازم object)
    cart.items.push({
        product: productId,
        unitePrice: product.price,
        quantity,
    });

    cart.totalAmount += product.price * quantity;

    const updated = await cart.save();

    return { data: updated, statusCode: 200 };
};

interface UpdetedItemToCart {
    productId: any;
    quantity: number;
    userId: string; //  توحيد الاسم
}

export const UpdetedItemcart = async ({ productId, quantity, userId }: UpdetedItemToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existingInCart = cart.items.find(
        (p: any) => String(p.product) === String(productId)
    );

    const product = await productModel.findById(productId);
    if (!existingInCart) {
        return { data: "Item dose not exsted in cart!", statusCode: 400 };
    }
    if (!product) {
        return { data: "Product not found!", statusCode: 404 };
    }

    if (product.stock < quantity) {
        return { data: "Low Stock for item", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
        (p: any) => p.product.toString() !== String(productId)
    );

    const total = otherCartItems.reduce((sum: number, item: any) => {
        return sum + item.quantity * item.unitePrice;
    }, 0);

    const newTotal = total + existingInCart.quantity * existingInCart.unitePrice;
    cart.totalAmount = total;
    existingInCart.quantity = quantity;
    cart.totalAmount = newTotal;

    const Updetedcart = await cart.save();
    return { data: Updetedcart, statusCode: 200 }

}
interface DeleteItemToCart {
    productId: any;
    userId: string;
}

export const DeleteItemInCart = async ({ userId, productId }: DeleteItemToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existingInCart = cart.items.find(
        (p: any) => String(p.product) === String(productId)
    );

    if (!existingInCart) {
        return { data: "Item dose not exsted in cart!", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter(
        (p: any) => p.product.toString() !== String(productId)
    );

    const total = otherCartItems.reduce((sum: number, item: any) => {
        return sum + item.quantity * item.unitePrice;
    }, 0);

    cart.totalAmount = total;
    cart.items = otherCartItems;

    const Updetedcart = await cart.save();

    return { data: Updetedcart, statusCode: 200 };

}