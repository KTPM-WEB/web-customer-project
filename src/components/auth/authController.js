/*************************** GET methods ***************************/
// Render Login page
exports.renderLogin = (req, res) => {
    res.render("auth/views/login");
};

// Render Register page
exports.renderRegister = (req, res) => {
    res.render("auth/views/register");
};