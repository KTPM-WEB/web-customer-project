const productModel = require('./model/productModel');
const userModel = require('../user/userModel');
const productReview = require('./model/productReviewModel');

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
        return await productModel.find({name: {$regex: new RegExp('^' + name + '.*', 'i')}}).exec();
    } catch (err) {
        throw err;
    }
}

/**
 * get product by field
 * @param field {string}
 * @param type {string}
 * @returns {Promise<*>}
 */
module.exports.getProductByField = async (field, type) => {
    try {
        if (type === 'name') {
            return await productModel.find({name: {$regex: new RegExp('^' + field + '.*', 'i')}}).exec();
        } else if (type === 'category') {
            return await productModel.find({category: {$regex: new RegExp('^' + field + '.*', 'i')}}).exec();
        } else if (type === 'brand') {
            return await productModel.find({brand: {$regex: new RegExp('^' + field + '.*', 'i')}}).exec();
        } else if (type === 'price') {
            return await productModel.find({price: {$lte: field + 49 || 1000000000, $gte: field || 150}}).exec();
        } else if (type === 'size') {
            return await productModel.find({size: {$regex: new RegExp('^' + field + '.*', 'i')}}).exec();
        } else if (type === 'color') {
            return await productModel.find({color: [{$regex: new RegExp('^' + field + '.*', 'i')}]}).exec();
        }
    } catch (err) {
        throw err;
    }
}

/**
 * get distinct product by category, brand, color
 * @param field {string}
 * @returns {Promise<*>}
 */
module.exports.getDistinctByField = (field) => {
    try {
        return productModel.distinct(field).lean();
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
            {"$match": {"category": {"$eq": categoryValue}}},
            {"$sample": {"size": 4}}
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
module.exports.getAllReviewByProductID = (productID) => {
    try {
        return productReview.find({productID: productID}).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * save product
 * @param userName {string}
 * @param productID {string}
 * @param content {string}
 * @returns {Promise<*>}
 */
module.exports.createReview = async (userName, productID, content) => {
    try {
        await new productReview({
            userName: userName,
            productID: productID,
            content: content,
            createdAt: Date.now()
        }).save();
    } catch (err) {
        throw err;
    }

}

/**
 * add product to cart
 * @param productID {string}
 * @param user_id {string}
 * @param quantity {number}
 * @returns {Promise<*>}
 */
module.exports.addToCart = async (productID, user_id, quantity = 1) => {
    try {
        console.log("service add to cart");
        var user = await userModel.findOne({_id: user_id});
        const product = await productModel.findOne({_id: productID});

        if (user && product) {

            // product exist in cart
            let itemIdx = user.cart.findIndex(item => item.productID === productID);
            console.log("itemIdx: " + itemIdx);

            if (itemIdx > -1) {
                // product exist in cart, update quantity
                console.log("update quantity");
                user.cart[itemIdx].quantity += quantity;
                user.cart[itemIdx].total = user.cart[itemIdx].quantity * product.price;
            } else {
                // product not exist in cart, add new item
                console.log("push new product");
                user.cart.push({
                    productID: productID,
                    quantity: 1,
                    total: product.price
                });
            }

            user.total = 0;

            for (let i = 0; i < user.cart.length; i++) {
                const product_total = await productModel.findOne({_id: user.cart[i].productID});
                user.total += user.cart[i].quantity * product_total.price;
            }

            user.total = Math.round(user.total * 100) / 100;

            user = await user.save();

            return user;
        }
    } catch (err) {
        throw err;
    }
}

