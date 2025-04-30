// use jwt to create a signature to authorize users to do certain tasks
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token not found" });
    }

    // grab token from headers (remove 'Bearer' part of string)
    const token = authorization.split(" ")[1];

    try {
        // decode & extract user id from token
        // checks to see if token was signed with same secret id, if so, will give us id
        const { _id } = jwt.verify(token, process.env.SECRET);

        // save user in request
        req.user = await User.findById(_id).select("_id");

        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default auth;
