const BaseException = require('./base.exception');

class SchemaException extends BaseException {
	constructor(errors) {        
		super('Bad Schema', 400);
		this.fields = errors.details.map(error => ({
			description: error.message,
		}));
        this.status = 401;
	}
}

module.exports = SchemaException;
