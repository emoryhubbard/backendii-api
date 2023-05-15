const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const DBConnection = require('../model/dbconnection').DBConnection;
const ContactsController = require('../controllers/contacts').ContactsController;
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const dbConnection = new DBConnection();
const contactsController = new ContactsController(dbConnection);

router.get('/', mainController.jonathanRoute);
router.get('/contacts/allContacts', contactsController.allContactsRoute.bind(contactsController));
router.get('/contacts/oneContact', contactsController.oneContactRoute.bind(contactsController));
router.post('/contacts', contactsController.createContactRoute.bind(contactsController));
router.put('/contacts', contactsController.updateContactRoute.bind(contactsController));
router.delete('/contacts', contactsController.deleteContactRoute.bind(contactsController));
router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = router;

/* Before refactoring to use only a single database connection
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const contactsController = require('../controllers/contacts')

router.get('/', mainController.jonathanRoute);
router.get('/contacts/allContacts', contactsController.allContactsRoute);
router.get('/contacts/oneContact', contactsController.oneContactRoute);

module.exports = router;
*/

/*
Before debugging render.com's 'Cannot GET /contacts/allContacts':

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const contactsController = require('../controllers/contacts')

router.get('/', mainController.jonathanRoute);
router.get('/contacts/allContacts', contactsController.allContactsRoute);
router.get('/contacts/oneContact', contactsController.oneContactRoute);

module.exports = router;
*/