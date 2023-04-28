const routes = require('express').Router();
const mainController = require('../controllers/main');

routes.get('/', mainController.jonathanRoute);

module.exports = routes;