const BaseException = require('./base.exception');

class UserAlreadyExist extends BaseException {
	constructor(error) {        
		super('User already exist', 400);
		this.message = error;
	}
}

module.exports = UserAlreadyExist;
