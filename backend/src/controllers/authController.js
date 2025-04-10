import {request, response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../middleware/verifyToken.js';

dotenv.config();

//const JWT_SECRET = process.env.JWT_SECRET;

export const signup1 =  async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const existingUser = await User.findOne({ email: request.body.email });
        if (existingUser) {
            console.log("Cannot use the same email more than once!");
            return response.status(400).send("This email is already in use!");
        }

        //const data = new User(request.body);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const data = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName, 
            email : request.body.email,
            role : "mentee",
            password: hashedPassword,
        });
        const result = await data.save();
        
        const token = jwt.sign({ 
            firstName: data.firstName,
            lastName: data.lastName, 
            email: data.email,
            role: data.role
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful signup (part 1)!");
        response.status(200).json({ message: "signup part 1 successful!", 
            token: token});
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }
};

export const signup2 = async (request, response) => {
    let email = request.user.email;
    console.log(email);
    try {
        const existingEmail = await UserDetail.findOne({ email : email });
        if (existingEmail) {
            console.log("A User with this email already exists!");
            return response.status(400).send("A User with this email already exists!");
        }

        const data = new UserDetail({
            email: email,
            phoneNumber: request.body.phoneNumber,
        })

        const result = await data.save();
        response.status(201).json({ message: "Signup complete!", role: request.user.role});
    }
    catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }

}

export const login = async (request, response) => {
    try {
        const existingUser = await User.findOne({email : request.body.email });
        if  (!existingUser) {
            console.log("No such User on platform! You should sign up");
            return response.status(400).send("No such User on platform! You should sign up");
        }

        const isValidPassword = await bcrypt.compare(request.body.password, existingUser.password);

        if (!isValidPassword) {
            console.log("Incorrect password!");
            return response.status(400).send("Incorrect password!");
        }

        let role = "mentee";
        if (request.body.email === "mentor@example.com" || request.body.email === "mentor2@example.com"
            || request.body.email === "mentor3@example.com")
                role = "mentor"


        const token = jwt.sign({ 
            firstName: existingUser.firstName,
            lastName: existingUser.lastName, 
            email: existingUser.email,
            role: role
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful login!");
        response.status(200).json({ message: "Login successful!", 
            role: role, token: token});
    }
     catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("An error occurred during login.");
    }
};
