/*************************** GET methods ***************************/
// Render check out page
exports.render = (req, res) => {
    res.render("check/views/check", {active: {Check:true}, page:"check"});
};
