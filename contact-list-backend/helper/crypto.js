const crypto = require('crypto');
const config = require('config'); 
const algorithm = 'aes-256-ctr';
module.exports = {
    decrypt: (hash) => {
        return new Promise(async (resolve, reject) => {
            try {
                const secretKey = config.get('jwt.secretKey');
                const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
                const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
                return resolve(decrpyted.toString());
            } catch (error) {
                return reject(error);
            }
        });
    }
}