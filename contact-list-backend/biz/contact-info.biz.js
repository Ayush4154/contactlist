const mongo = require('./../db/mongo');
const ObjectId = require('mongodb').ObjectId; 
const UserAlreadyExist = require('../exceptions/user-already-exist');
class ContactInfo {
    constructor() {

    }

    fetchContactInfo(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const contactList = await mongo.find('user_contacts', { userId });
                if (contactList) {
                    return resolve({
                        contactList
                    });
                }
                return resolve({
                    contactList: []
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    addContactInfo(userId, fullName, email, phoneNo) {
        return new Promise(async (resolve, reject) => {
            try {
                const userExist = await mongo.findOne('user', { _id: new ObjectId(userId) });
                if (!userExist) {
                    return reject({
                        message: 'User does not exist'
                    });
                }
                const contactExist = await mongo.findOne('user_contacts', { userId, email });
                if (!contactExist) {
                    await mongo.insertOne('user_contacts', {
                        userId,
                        fullName,
                        email,
                        phoneNo
                    });
                    return resolve({
                        message: 'contact created successfully!'
                    });
                } 
                throw new UserAlreadyExist('contact Already Exist!');
            } catch (error) {
                return reject(error);
            }
        });
    }

    deleteContact(contactId) {
        return new Promise(async (resolve, reject) => {
            try {
                const contactDeleted = await mongo.deleteMany('user_contacts', { _id: new ObjectId(contactId) });
                if (!contactDeleted) {
                    return reject({
                        message: 'Unable to delete contact'
                    });
                }
                return resolve({
                    message: 'contact deleted successfully'
                }); 
            } catch (error) {
                return reject(error);
            }
        });
    }

    updateContact(contactId, email, fullName, password) {
        return new Promise(async (resolve, reject) => {
            try {
               const isUpdated = await mongo.updateOne( { _id: new ObjectId(contactId) } , 'user_contacts', {
                   $set: {
                       email,
                       fullName,
                       password
                   }
               });
               return resolve({
                   isUpdated,
                   message: 'contact updated successfully!'
               });
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = ContactInfo;