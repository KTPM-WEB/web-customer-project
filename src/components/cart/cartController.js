/*************************** GET methods ***************************/
// Render cart page
exports.render = (req, res) => {
    res.render("cart/views/cart", {active: {Cart:true}, page:"cart"});
};
