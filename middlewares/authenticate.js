const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { RequestError } = require("../helpers");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(RequestError(401, "Not authorized"))
    }
    try {
        const {_id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById({_id});
        if(!user || !user.token){
            next(RequestError(401, "Not authorized"))
        }
        req.user = user;
        next()
    } catch (error) {
        next(RequestError(401, error.message));
    }

}

module.exports = authenticate;