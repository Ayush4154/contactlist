const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports = {
    findOne: (collection, query) => new Promise(async (resolve, reject) => {
        try {
            db.collection(collection).findOne(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    }),

    find: (collection, query) => new Promise(async (resolve, reject) => {
        try {
            db.collection(collection).find(query).toArray((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    }),

    insertOne: (collection, query) => new Promise(async (resolve, reject) => {
        try {
            db.collection(collection).insertOne(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result && result.insertedId);
            });
        } catch (error) {
            reject(error);
        }
    }),

    updateOne: (uniqueKey, collection, query, upsert) => new Promise(async (resolve, reject) => {
        try {
            db.collection(collection).updateOne(uniqueKey, query, { upsert }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    }),

    deleteMany: (collection, query) => {
        return new Promise(async (resolve, reject) => {
            try {
                db.collection(collection).deleteMany(query, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(true);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
