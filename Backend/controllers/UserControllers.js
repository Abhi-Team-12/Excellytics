import { hash } from "bcrypt";
import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async(req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});
    if(user){
       return res.send({
            message: "User Already Exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashPassword,
    })
    generateToken(user._id, res);

    return res.status(201).json({
        user,
        success: true,
        message: "Account Created"
    })
});

export const loginUser = TryCatch(async(req, res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.json({
            success: false,
            message: "No User Exists"
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        return res.json({
            success: false,
            message: "Wrong Password"
        })
    }

    generateToken(user._id, res);

    res.status(200).json({
        success: true,
        user,
        message: "User Loggin",
    })
})