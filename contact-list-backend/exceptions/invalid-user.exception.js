const BaseException = require('./base.exception');

class InvalidUserException extends BaseException {
	constructor(error) {        
		super('Invalid user', 401);
		this.message = error;
	}
}

module.exports = InvalidUserException;
