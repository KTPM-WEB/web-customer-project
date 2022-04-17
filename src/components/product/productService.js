const productModel = require('./model/productModel');
const userModel = require('../user/userModel');
const ReviewModel = require('./model/productReviewModel');
const orderModel = require('../order/orderModel');
const ls = require("local-storage");

/**
 * get all product
 * @returns {Promise<*>}
 */
module.exports.getAllProducts = async () => {
    try {
        return await productModel.find().lean();
    } catch (err) {
        throw err;
    }
};

/**
 * get product by ID
 * @param id {string}
 * @returns {Promise<*>}
 */
module.exports.getProductByID = (id) => {
    try {
        return productModel.findById(id).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * get product by name
 * @param name {string}
 * @returns {Promise<*>}
 */
module.exports.getProductByName = async (name) => {
    try {
        return await productModel.find({ name: { $regex: new RegExp('^' + name + '.*', 'i') } }).exec();
    } catch (err) {
        throw err;
    }
}

/**
 * get product by field
 * @param field {string||number}
 * @param type {string}
 * @returns {Promise<*>}
 */
module.exports.getProductByField = async (field, type) => {
    try {
        if (type === 'name') {
            return await productModel.find({ name: { $regex: new RegExp('^' + field + '.*', 'i') } }).exec();
        } else if (type === 'category') {
            return await productModel.find({ category: { $regex: new RegExp('^' + field + '.*', 'i') } }).exec();
        } else if (type === 'brand') {
            return await productModel.find({ brand: { $regex: new RegExp('^' + field + '.*', 'i') } }).exec();
        } else if (type === 'price') {
            if (field === '0') {
                return await productModel.find({ price: { $lte: 49, $gte: 0 } }).exec();
            } else if (field === '150+') {
                return await productModel.find({ price: { $gte: 150 } }).exec();
            }
            return await productModel.find({ price: { $lte: parseInt(field) + 49, $gte: parseInt(field) } }).exec();

        } else if (type === 'size') {
            return await productModel.find({ size: { $regex: new RegExp('^' + field + '.*', 'i') } }).exec();
        } else if (type === 'color') {
            return await productModel.find({ color: [{ $regex: new RegExp('^' + field + '.*', 'i') }] }).exec();
        } else if (type === '') {
            return await productModel.find({}).exec();
        } else if (type === 'sort' && field === 'Low to High') {
            return await productModel.find({}).sort({ price: 1 }).exec();
        } else if (type === 'sort' && field === 'High to Low') {
            return await productModel.find({}).sort({ price: -1 }).exec();
        }
    } catch (err) {
        throw err;
    }
}

/**
 * get related product by category
 * @param categoryValue {string}
 * @returns {Promise<*>}
 */
module.exports.getRelatedList = async (categoryValue) => {
    try {
        return productModel.aggregate([
            { "$match": { "category": { "$eq": categoryValue } } },
            { "$sample": { "size": 4 } }
        ])
    } catch (err) {
        throw err;
    }
}

/**
 * get all review by product ID
 * @param productID {string}
 * @returns {Promise<*>}
 */
module.exports.getAllReviewByProductID = (productID,stranger_name=null, fullname=null) => {
    try {
        if (stranger_name)
            return ReviewModel.find({ productID: productID, stranger_name: stranger_name }).sort({ createdAt: -1 }).lean();
        else if (fullname)
            return ReviewModel.find({ productID: productID, fullname: fullname }).sort({ createdAt: -1 }).lean();
        else
            return ReviewModel.find({ productID: productID }).sort({ createdAt: -1 }).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * save review
 * @param fullname {string}
 * @param productID {string}
 * @param content {string}
 * @param createAt
 * @returns {Promise<*>}
 */
module.exports.createReview = async (id, fullname, stranger_name,productID, content, createAt) => {
    try {
        if (fullname)
        {
            const user = await userModel.findById(id).lean()

            await new ReviewModel({
                fullname: fullname,
                avatar: user.avatar_url,
                productID: productID,
                content: content,
                createdAt: createAt
            }).save();
        }

        else
        {
            await new ReviewModel({
                stranger_name: stranger_name,
                avatar: "https://ssl.gstatic.com/docs/common/profile/nyancat_lg.png",
                productID: productID,
                content: content,
                createdAt: createAt
            }).save();
        }

    } catch (err) {
        throw err;
    }

}

/**
 * add product to cart
 * @param productID {string}
 * @param userID {string}
 * @param quantity {number}
 * @returns {Promise<*>}
 */
module.exports.addToCart = async (productID, userID = undefined, quantity = 1) => {
    try {
        console.log("---- add to cart ----");
        if (userID) {
            let user = await userModel.findOne({ _id: userID });
            const product = await productModel.findOne({ _id: productID });

            if (user && product) {

                // product exist in cart
                let itemIdx = user.cart.findIndex(item => item.productID === productID);

                if (itemIdx > -1) {
                    // product exist in cart, update quantity
                    user.cart[itemIdx].quantity += parseInt(quantity);
                    user.cart[itemIdx].total = user.cart[itemIdx].quantity * product.price;
                } else {
                    // product not exist in cart, add new item
                    user.cart.push({
                        productID: productID,
                        quantity: parseInt(quantity),
                        total: product.price
                    });
                }

                user.total = 0;

                for (let i = 0; i < user.cart.length; i++) {
                    const product_total = await productModel.findOne({ _id: user.cart[i].productID });
                    user.total += user.cart[i].quantity * product_total.price;
                }

                user.total = Math.round(user.total * 100) / 100;

                user = await user.save();
            }
            return user;
        } else {
            console.log("not login");
            const product = await productModel.findOne({ _id: productID });

            if (product) {
                let cart = JSON.parse(ls.get('cart'));
                console.log('----');
                console.log("cart:", cart);
                console.log('----');

                // product exist in cart
                let itemIdx = cart.findIndex(item => item.productID === productID);

                if (itemIdx > -1) {
                    // product exist in cart, update quantity
                    cart[itemIdx].quantity += parseInt(quantity);
                    cart[itemIdx].total = cart[itemIdx].quantity * product.price;
                } else {
                    // product not exist in cart, add new item
                    cart.push({
                        productID: productID,
                        quantity: parseInt(quantity),
                        total: product.price
                    });
                }
                console.log("cart update:", cart);

                let total = 0;

                for (let i = 0; i < cart.length; i++) {
                    const product_total = await productModel.findOne({ _id: cart[i].productID });
                    total += cart[i].quantity * product_total.price;
                }


                // save local storage
                ls.set("cart", JSON.stringify(cart));
                ls.set("total", Math.round(total * 100) / 100)

                console.log("total:", ls.get("total"));
            }
        }
    } catch (err) {
        throw err;
    }
}
