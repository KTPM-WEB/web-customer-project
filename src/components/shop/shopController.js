/*************************** GET methods ***************************/
// Render shop page
exports.render = (req, res) => {
    res.render("shop/views/shop");
};

// Render product detail page
exports.rederDetail = (req, res) => {
    res.render("shop/views/product_detail");
};
