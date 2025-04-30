import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

/************** CREATE JWT **************/
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

/************** REGISTER USER **************/
const registerUser = async (req, res) => {
    // grab data from request body
    const { email, password } = req.body;

    // validation: check fields are not empty
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // check if email already exists
    const exist = await User.findOne({ email }); // or email:email
    if (exist) {
        return res
            .status(400)
            .json({ error: "Account with this email already exists" });
    }

    // hash password
    //salt default = 10
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
        // register user
        const user = await User.create({ email, password: hashed });

        // create jwt
        const token = createToken(user._id);

        // send response
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************** LOGIN USER **************/
const loginUser = async (req, res) => {
    // grab data from request body
    const { email, password } = req.body;

    // validation: check fields are not empty
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // check if email already exists
    const user = await User.findOne({ email }); // or email:email
    if (!user) {
        return res.status(400).json({ error: "Incorrect email" });
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    try {
        // create jwt
        const token = createToken(user._id);

        //send response
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export { registerUser, loginUser };
