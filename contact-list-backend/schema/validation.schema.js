const Joi = require('joi');

module.exports = {
    loginValidator: Joi.object({
        token: Joi.string()
        .min(20)
        .trim()
        .required(),
        username: Joi.string()
        .min(8)
        .trim()
        .required(),
        passwordHash: Joi.string()
        .min(20)
        .trim()
        .required(),
    }).unknown(true),
    signupValidator: Joi.object({
        email: Joi.string()
        .min(8)
        .trim()
        .required(),
        password: Joi.string()
        .min(8)
        .trim()
        .required()
    }).unknown(true),
    addContactValidator: Joi.object({
        email: Joi.string()
        .min(5)
        .trim()
        .required(),
        userId: Joi.string().min(10).required(),
        fullName: Joi.string().min(5).required(),
        phoneNo: Joi.string().min(10).required(),
    }).unknown(true),
    fetchContactValidator: Joi.object({
        userId: Joi.string().min(8).required()
    }).unknown(true),
    deleteContactValidator: Joi.object({
        id: Joi.string().min(8).required()
    }).unknown(true),
    updateContactValidator: Joi.object({
        id: Joi.string().min(10).required(),
        email: Joi.string()
        .min(8)
        .trim()
        .required(),
        fullName: Joi.string().min(8).required(),
        phoneNo: Joi.string().min(10).required(),
    }).unknown(true)
};