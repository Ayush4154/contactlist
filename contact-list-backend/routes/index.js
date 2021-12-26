const express = require('express');
const router = express.Router();

const validator = require('./../controller/validation.controller');
validator.register(router);

const contactListController = require('./../controller/contact-list.controller');
contactListController.register(router);

module.exports = router;