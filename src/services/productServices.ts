import productModel from "../models/productModel.js";


export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitialProducts =async () => {
    const products = [
        { title: "Dell Laptob", image: "https://www.bing.com/images/search?view=detailV2&ccid=4Lvf%2bvQa&id=2FE6E90002C1FB0F2196841E8651DFAB0B1E0895&thid=OIP.4Lvf-vQaZLbqCCGp5HLLDAHaEK&mediaurl=https%3a%2f%2flaptopmedia.com%2fwp-content%2fuploads%2f2025%2f01%2f5-55.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e0bbdffaf41a64b6ea0821a9e472cb0c%3frik%3dlQgeC6vfUYYehA%26pid%3dImgRaw%26r%3d0&exph=1080&expw=1920&q=laptop&FORM=IRPRST&ck=A457A70F2DBCF9EAA76D7F6D677E7B48&selectedIndex=4&itb=0", price: 15000, stock: 10 }
    ]


    const existingproducts =await getAllProducts();

    if(existingproducts.length === 0){
        await productModel.insertMany(products)
    }
}