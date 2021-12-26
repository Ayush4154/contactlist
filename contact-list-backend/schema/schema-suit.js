const SchemaException = require('./../exceptions/schema.exception');

class SchemaSuit {
    constructor() {
        
    }
    async ValidateSchema(schema, data) {
        try {
            await schema.validateAsync(data);
        } catch (error) {
            throw new SchemaException(error);
        }
    }
}

module.exports = new SchemaSuit();