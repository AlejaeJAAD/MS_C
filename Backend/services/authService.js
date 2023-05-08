import Register from '../models/Register.js'
import Login from '../models/Login.js'
import bcrypt from "bcrypt"
import Joi from 'joi'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv';
dotenv.config();

export const register = async (data) => {
    const userId = data.registeredUser.dataValues.id
    const { email, password } = data

    const emailAlreadyExists = await Register.findOne({
        where: { email: email }
    });
    if (emailAlreadyExists) {
        console.log('Email already registered')
    }

    // Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newRegister = new Register({
        email: email,
        password: hashedPassword,
        id: userId
    })
    const registerInfo = await newRegister.save()
}