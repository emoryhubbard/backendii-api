const getNewClient = require('../model/dbconnection').getNewClient;
const queryCollection = require('../model/dbconnection').queryCollection;
const send = require('../utils/index').send;
const ObjectId = require('mongodb').ObjectId;

async function allContactsRoute(req, res) {
    const documents = await queryCollection('contacts');
    send(res, documents);
};

//test id: 644c519e9b4a6d0ff7ca7661
//test url: http://localhost:3000/contacts/oneContact?id=644c519e9b4a6d0ff7ca7661

async function oneContactRoute(req, res) {
    const queryParam = req.query.id;
    const query = { _id: new ObjectId(queryParam)};
    const document = await queryCollection('contacts', query);

    send(res, document);
}

module.exports = {
    allContactsRoute,
    oneContactRoute
};