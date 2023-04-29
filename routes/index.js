const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const contactsController = require('../controllers/contacts')

router.get('/', contactsController.allContactsRoute);
router.get('/contacts/allContacts', contactsController.allContactsRoute);
router.get('/contacts/oneContact', contactsController.oneContactRoute);

module.exports = router;

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