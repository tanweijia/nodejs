var token = require("./token.js");
// console.log(token);
module.exports = (req, res, callback) => {
    console.log(token.checkToken(req.headers.token));
    if (token.checkToken(req.headers.token)) {
        callback()
    } else {
        res.send({
            status: "token失效"
        })
    }
}