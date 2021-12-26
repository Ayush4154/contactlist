const mongo = require('./../db/mongo');

class AuthBiz {
    
    constructor() {

    }

    login() {
        return new Promise(async (resolve, reject) => {
            try {
                
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