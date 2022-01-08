const mongo = require('./../db/mongo');
const jwt = require('jsonwebtoken');
const config = require('config');
const cryptoUtil = require('./../helper/crypto');
const {
    InvalidUserException
} = require('./../exceptions/invalid-user.exception');
class AuthBiz {

    constructor() {

    }

    login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    token,
                    username,
                    passwordHash,
                } = data;
                try {
                    // do something with token
                } catch (error) {
                    throw new InvalidUserException('Token Invalid');
                }
                const user = await mongo.findOne('user', { email: username, password: passwordHash });
                return resolve({
                    userExist: true,
                    userId: user._id.toString(),
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    signup(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const userInfo = await mongo.updateOne({ email }, 'user', {
                    $set: {
                        email,
                        password
                    }
                }, true);

                return resolve({
                    userCreated: true,
                    message: 'User created!',
                });
            } catch (error) {
                return reject(error);
            }
        })
    }

}

module.exports = AuthBiz;