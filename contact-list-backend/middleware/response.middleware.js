
module.exports = async (request, response, next) => {
	try {
		const oldJson = response.json;
		response.json = (data, message, serviceData = null) => {
			let newResponseData = {};
			if (!data || data.code === 'ERROR') {
				response.status(data.data.status);
                delete data.data.status;
				delete data.data.stack;
                newResponseData = {
					success: false,
					error: {
						message: data.data.message || data
					},
				};
			} else {
				newResponseData = {
					success: true,
					message: message || '',
					data,
				};
			}

			response.json = oldJson;
			return oldJson.call(response, newResponseData);
		};
		next();
	} catch (error) {
		next(error);
	}
};
