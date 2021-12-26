

const {
    loginValidator,
    signupValidator,
} = require('../schema/validation.schema');
const schemaSuit = require('../schema/schema-suit');

const {
    AuthBiz
} = require('./../biz/index');

module.exports = {
    register(app) {
        app.route('/login')
            .post(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(loginValidator, { ...request.headers, ...request.body });
                    response.json({
                        data: {
                            
                        }
                    }, 'login successful!');
                } catch (error) {
                    response.json({
                        code: 'ERROR',
                        data: error
                    }, 'ERROR');
                }
            });

        app.route('/signup')
            .post(async (request, response, next) => {
                try {
                    await schemaSuit.ValidateSchema(signupValidator, { ...request.body });
                    const {
                        email,
                        password,
                    } = request.body;
                    const authBiz = new AuthBiz();
                    const result = await authBiz.signup(email, password);
                    response.json({
                        ...result
                    }, 'login successful!');
                } catch (error) {
                    next(error);
                }
            });
    },
}