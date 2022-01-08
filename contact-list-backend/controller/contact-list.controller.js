
const {
    addContactValidator,
    fetchContactValidator,
    deleteContactValidator,
    updateContactValidator
} = require('../schema/validation.schema');
const schemaSuit = require('../schema/schema-suit');
const {
    ContactInfoBiz
} = require('./../biz/index');

module.exports = {
    register(app) {
        app.route('/contact/:id')
            .delete(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(deleteContactValidator, { ...request.body, ...request.params });
                    const {
                        id: contactId,
                    } = request.params;
                    const contactInfo = new ContactInfoBiz();
                    const result = await contactInfo.deleteContact(contactId);
                    response.json({
                        ...result
                    }, 'Success');
                } catch (error) {
                    response.json({
                        code: 'ERROR',
                        data: error
                    }, 'ERROR');
                }
            })
            .patch(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(updateContactValidator, { ...request.body, ...request.params });
                    const contactInfo = new ContactInfoBiz();
                    const {
                        id: contactId,
                    } = request.params;
                    const {
                        fullName, 
                        email,
                        phoneNo
                    } = request.body;
                    const result = await contactInfo.updateContact(contactId, email, fullName, phoneNo);
                    response.json({
                        ...result
                    }, 'Success');
                } catch (error) {
                    response.json({
                        code: 'ERROR',
                        data: error
                    }, 'ERROR');
                }
            });

        app.route('/contact')
            .post(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(addContactValidator, { ...request.body });
                    const {
                        userId,
                        fullName, 
                        email,
                        phoneNo
                    } = request.body;
                    const contactInfo = new ContactInfoBiz();
                    const result = await contactInfo.addContactInfo(userId, fullName, email, phoneNo);
                    response.json({
                        ...result
                    }, 'Success');
                } catch (error) {
                    response.json({
                        code: 'ERROR',
                        data: error
                    }, 'ERROR');
                }
            });
            
        app.route('/contacts/:userId')
            .get(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(fetchContactValidator, { ...request.body, ...request.params });
                    const {
                        userId,
                    } = request.params;
                    const contactInfo = new ContactInfoBiz();
                    const result = await contactInfo.fetchContactInfo(userId);
                    response.json({
                        data: result.contactList
                    }, 'Success');
                } catch (error) {
                    next(error);
                }
            });
    },
}