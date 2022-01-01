const mongo = require('./../db/mongo');
const jwt = require('jsonwebtoken');
const config = require('config');

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
                   token
               } = data;

               try {
                   jwt.verify(token, config.get('jwt.privateKey'));
                   
               } catch (error) {
                   throw new InvalidUserException('Token Invalid');
               }
            } catch (error) {
                reject(error);
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