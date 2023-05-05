import Login from '../models/Login.js'
import Customer from '../models/Customer.js'
import Employee from '../models/Employee.js'
import Register from '../models/Register.js'
import generateToken from '../utils/generateToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import generateRecoverPasswordToken from '../utils/generateRecoverPasswordToken.js'
import restorePasswordToken from '../middlewares/restorePasswordToken.js'
import Joi from 'joi'
import bcrypt from "bcrypt"
import transporter from '../config/mailer.js'
import * as dotenv from 'dotenv'
dotenv.config();
import { Op } from 'sequelize'


const schemaLogin = Joi.object({
    email: Joi.string().min(3).max(1024).required(),
    password: Joi.string().min(6).max(1024).required()
})

export const register = async (req, res) => {
    const { email, password } = req.body.form
    const { option } = req.body

    try {
        // Chek if email already exists
        const emailAlreadyExists = await Register.findOne({
            where: { email: email }
        });
        if (emailAlreadyExists) {
            return res.status(500).json({
                mesage: 'Email already registered'
            });
        }

        const newUser = await Register.create({ email, password })

        // Register a customer or employee based on the option.
        let registeredUser;
        if (option === 'customer') {
        const {
                firstName,
                lastName,
                address,
                city,
                country,
                postalCode,
                phone,
                email,
                company,
                state,
                fax
            } = req.body
            registeredUser = await Customer.create({
                firstName,
                lastName,
                address,
                city,
                country,
                postalCode,
                phone,
                email,
                company,
                state,
                fax
            });
        } else if (option === 'employee') {
        const {
                firstName,
                lastName,
                address,
                city,
                country,
                postalCode,
                phone,
                email,
                company,
                state,
                fax,
                title,
                reportsTo,
                birthDate,
                hireDate
            } = req.body
            registeredUser = await Employee.create({
                firstName,
                lastName,
                address,
                city,
                country,
                postalCode,
                phone,
                email,
                company,
                state,
                fax,
                title,
                reportsTo,
                birthDate,
                hireDate
            });
        } else {
            return res.status(400).json({
                message: 'Invalid option'
            })
        }

        return res.status(201).json({
            message: `New ${option} registered successfully`,
            data: registeredUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const login = async (req, res) => {
    try {
        const { error } = schemaLogin.validate(req.body)
        if (error) return res.status(400).json({ error: error.details[0].message })

        const { email, password } = req.body

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password', bandera: false });
        }

        // Fetch the register record using the email
        try {
            const registerInfo = await Register.findOne({ where: { email: email } })

            const isCustomer = await Customer.findOne({ where: { email: email } })
            if (isCustomer) {
                if (!registerInfo) {
                    return res.status(401).json({ message: `We coulnd't find an email registered in our app.`, bandera: false });
                }
    
                let isPasswordCorrect
                try {
                    // Check if password is correct
                    isPasswordCorrect = await bcrypt.compare(password, registerInfo.dataValues.password);
                } catch (error) {
                    return res.status(401).json({
                        message: `The credentials provided are wrong.`,
                        bandera: false
                    })
                }
        
                if (!isPasswordCorrect) {
                    return res.status(401).json({
                        message: `
                            The login information was incorrect! <br>
                            Password must be wrong.
                        `,
                        bandera: false
                    });
                }
        
                // Call generateToken method
                const { token, expiresIn } = generateToken(registerInfo.dataValues.id) 
                generateRefreshToken(registerInfo.dataValues.id, res);
        
                // const userIP = req.headers['user-ip'];
        
                // const login = new Login({
                //     uid:  registerInfo.dataValues.id,
                //     loginDate: new Date(),
                //     loginIP: userIP
                // });
        
                // const userLoggedIn = await login.save()
        
                // Send JWT token to client
                return res.status(201).json({
                    token,
                    expiresIn,
                    // userLoggedIn,
                    message: 'Login successfull',
                    bandera: true
                })
                
            } else {
                return res.status(200).json({
                    message: `You're not a customer.`, bandera: false
                })
            }

            // Check if user exists
        } catch (error) {
            return res.status(401).json({ message: `You're not a customer registered in our application, please register.`, bandera: false });
        }


    } catch (error) {
        res.status(500).json({ 
            error: 'An error has occured trying to log in'
        });
    }
}

export const forgotPassword = async (req, res) => {
    const email = req.body.email
    
    if (!email) {
        return res.status(400).json({
            message: 'Email is required',
            flag: false
        })
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address', flag: false });
    }

    // Hash the email address
    // const hashedEmail = hashEmail(email);
    
    const user = await Customer.findOne({
        where: {
        email: {
                [Op.eq]: email,
            }
        }
    })
    
    if (!user) {
        return res.status(404).json({
            message: `We couldn't find a registered user with this email ${email}`, flag: false
        })
    }
    
    if (user) {
        const { token, expiresIn } = generateRecoverPasswordToken(user.dataValues.id, email)
        const message = 'Check your email for a link to reset your password'
        let verificationLink = `http://localhost:8080/confirm-forgot-password/${token}`
        let emailStatus = 'OK'
        
        try {
            const info = await transporter.sendMail({
                from: '"Forgot Password 👻" <alejandroanayadommega@gmail.com>',
                to: user.email,
                subject: "Reset password",
                html: `
                <html>
                    <b>Please click on the following link, or paste this into your browser to complete the process.</b>
                    <a href="${verificationLink}">${verificationLink}</a>
                </html>
                `
            })
    
            console.log("Message sent: %s", info.accepted);

    
                return res.status(200).json({
                    message,
                    flag: true,
                    info: emailStatus,
                    test: verificationLink
                })
            
        } catch (error) {
            return res.status(400).json({
                message: 'Something went wrong',
                error: error
            })
        }
    }
}

function isValidEmail(email) {
    // Regular expression to validate email addresses
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

function hashEmail(email) {
    const saltRounds = 10;
    const saltedEmail = email + process.env.EMAIL_HASH_SALT;
    return bcrypt.hash(saltedEmail, saltRounds);
}

export const confirmForgotPassword = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).send("Missing token parameter");
        }
        const { token } = req.query;
        const { form } = req.body;
        const { password, confirmPassword } = form;
    
        const result = restorePasswordToken(token)
        
        if (result.error) {
            return res.status(200).json({
                message: result.error,
                flag: false
            })
        } else {
            const { email, exp } = result
            //Validate expiration of the token
            const now = new Date();
            const expirationDate = new Date(exp * 1000);
    
            if (expirationDate.getTime() > now.getTime()) {
                console.log('Token is still valid');
                const register = await Register.findOne({ where: { email } });
        
                if (!register) {
                    return res.status(404).send({
                        error: `
                            A CUSTOMER RECORD WAS NOT FOUND! <br>
                        `
                    })
                }
        
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(password, salt);
                console.log(newPassword, password, 'CONFIRM')
        
                await register.update({ password: newPassword });

                const message = 'Check your email for a link to log in to the application.'
                let verificationLink = `http://localhost:8080/login`
                let emailStatus = 'OK'

                const info = await transporter.sendMail({
                    from: '"Password changed successfully 👻" <alejandroanayadommega@gmail.com>',
                    to: email,
                    subject: "Password changed",
                    html: `
                    <html>
                        <b>Please click on the following link, or paste this into your browser to log in.</b>
                        <a href="${verificationLink}">${verificationLink}</a>
                    </html>
                    `
                })
        
                console.log("Message sent: %s", info.accepted);
        
                return res.status(200).json({
                    message: message,
                    emailStatus
                })
        
            } else {
                return res.status(200).json({
                    message: 'The token has expired. Please try resetting your password again.',
                    flag: false
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "Some error with the server" });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid)
            return res.json({
                token, expiresIn
            })
    } catch (error) {
        return res.status(500).json({ error: "Some error with the server" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("authToken");
    res.clearCookie("test");
    res.json({ ok: true });
};