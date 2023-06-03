import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from './../helpers/authHelpers.js';
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js"
export const registerControllers = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) {
            returnres.send({ message: 'name is required' })
        }
        if (!email) {
            return res.send({ message: 'emial is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!phone) {
            return res.send({ message: 'answer is required' })
        }
        if (!answer) {
            return res.send({ message: 'phone is required' })
        }
        //chech user
        const existingUser = await userModel.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save()

        res.status(201).send({
            success: true,
            message: 'user register successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }

}

export const loginControllers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: " email is not registeres"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }
        //token
        // const jwtvalue = user.email;
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log(token)
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
        console.log(token)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in login",

        })
    }
}

//test controller
export const testController = (req, res) => {
    // console.log("protected ")
    try {
        res.status(200).send("protected routes");
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}
export const forgotPasswordController = async (req, res) => {

    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newpaaword is required" })
        }
        //check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: falase,
                message: "Wrong email or answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}
export const updateProfileController = async (req, res) => {
    try {

        const { name, password, address, phone } = req.body
        const user = await userModel.findById(req.user._id)
        // the user is present in req when we use a requireSignIn in 
        if (password && password.length < 6) {
            return res.json({ error: "password is required and atleast 6 character long" })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
            phone: phone || user.phone
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Prodfile updated Successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })

    }
}

export const getOrderController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate('products', "-photo")
            .populate('buyer', "name")
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting Orders',
            error
        })
    }
}
export const getAllOrderController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate('products', "-photo")
            .populate('buyer', "name")
            .sort({ createdAt: '-1' })
        // console.log(orders)
        res.json(orders);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting all Orders',
            error
        })
    }
}
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status: status }, { new: true })
        res.json(orders);
    } catch (error) {

        res.status(500).send({
            success: false,
            message: 'Error while updateing',
            error
        })
    }
}