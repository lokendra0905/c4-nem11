const express = require("express");
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const { userModel } = require("../Models/user.model")

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, city, age, is_married } = req.body;

    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ error: "User Already Exist Cannot Register" })
        }

        const hashed = await bcrypt.hash(password, 5)
        const User = new userModel({
            name,
            email,
            gender,
            password: hashed,
            city,
            age,
            is_married
        });

        await User.save();

        return res.status(200).json({ msg: 'The new user has been registered' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.msg })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ course: "backend" }, "masai")
                return res.status(200).json({ message: "Login Successful", token })
            } else {
                return res.status(400).json({ message: "Wrong Crediential" })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Something Went Wrong" });
    }
})


module.exports = { userRouter };