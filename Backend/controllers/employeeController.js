import Employee from '../models/Employee.js';
import Register from '../models/Register.js'
import { register } from '../services/authService.js';
import Joi from 'joi'

const schemaRegister = Joi.object({
    lastName: Joi.string().min(4).max(100).required(),
    firstName: Joi.string().min(4).max(100).required(),
    title: Joi.string().min(3).max(100).required(),
    reportsTo: Joi.number().required(),
    birthDate: Joi.date().required(),
    hireDate: Joi.date().required(),
    address: Joi.string().min(4).max(100).required(),
    email: Joi.string().min(4).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
})

export const getEmployees = async (req, res) => {
    await Employee.findAll().then(employees => {
        return res.status(200).json({
            data: employees
        })
    }).catch(error => {
        console.error('Unable to retrieve employees:', error);
    });
}

export const createEmployee = async (req, res) => {
    const { lastName, firstName, title, reportsTo, birthDate, hireDate, address } = req.body
    const { email, password } = req.body
    try {
        // Validate user
        const { error } = schemaRegister.validate(req.body)
        
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const emailAlreadyExists = await Register.findOne({
            where: { email: email }
        });
        if (emailAlreadyExists) {
            return res.status(500).json({
                mesage: 'Email already registered'
            });
        }

        //New employee
        const newEmployee = new Employee({
            lastName,
            firstName,
            title,
            reportsTo,
            birthDate,
            hireDate,
            address
        });
        
        const registeredEmployee = await newEmployee.save();
        const data = {
            registeredUser: registeredEmployee,
            email,
            password
        }
        register(data)

        return res.status(201).json({
            mesage: 'New employee has been created',
            registeredEmployee
        });
    } catch (err) {
        console.log(err)
        if (error.code == 11000) {
            return res.status(400).json({
                error: 'Employee already exists!'
            })
        }
        return res.status(500).json({
            error: 'ERROR WITH SERVER!'
        })
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { title, reportsTo, address } = req.body
        const { params: { id } } = req
        await Employee.findByPk(id).then(employee => {
            if (!employee) {
                return res.status(404).json({
                    message: "Employee doesn't exists"
                })
            }
            employee.update({
                title: title,
                reportsTo: reportsTo,
                address: address
            }).then(employee => {
                    return res.status(201).json({
                        data: employee,
                        message: "The employee info has been updated sucessfully"
                    })
                })
            })
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const getEmployeeSubordinates = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                message: "El empleado no existe"
            });
        }
        const subordinates = await Employee.findAll({
            where: {
                reportsTo: id
            }
        });
        return res.status(200).json({
            data: subordinates,
            message: "Empleados obtenidos con exito"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error"
        });
    }
};
