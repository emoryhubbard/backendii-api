const send = require('../utils/index').send;
const ObjectId = require('mongodb').ObjectId;

class ContactsController {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async allContactsRoute(req, res) {
        const documents = await this.dbConnection.queryCollection('contacts');
        send(res, documents);
    };
    
    //test id: 644c519e9b4a6d0ff7ca7661
    //test url: http://localhost:3000/contacts/oneContact?id=644c519e9b4a6d0ff7ca7661
    
    async oneContactRoute(req, res) {
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        const document = await this.dbConnection.queryCollection('contacts', query);
    
        send(res, document);
    }
    async createContactRoute(req, res) {
        console.log("request body: ", req.body);
        await this.dbConnection.createDocument('contacts', req.body);
    }
    async updateContactRoute(req, res) {
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        console.log("request body: ", req.body);
        await this.dbConnection.updateDocument(query, 'contacts', req.body);
    }
    async deleteContactRoute(req, res) {
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        console.log("request id: ", queryParam);
        await this.dbConnection.deleteDocument(query, 'contacts');
    }
}

module.exports = {
    ContactsController
};

/* Before refactoring to use just a single database connection
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
*/