const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
const MongoClient = require('mongodb').MongoClient;

class DBConnection {
    constructor() {
        this.client = null;
    }
    async init(callback = this.doNothing) {
        if (this.client != null) {
            console.log('Be aware that database connection is already initialized');
            callback()
            return;
        }
        try {
            console.log("connectionString: ", connectionString);
            this.client = new MongoClient(connectionString);
            await this.client.connect();
            callback();
        } catch (e) {
            console.log(e);
            throw Error('Database connection failed');
        }
    }
    doNothing() {}
    getClient() {
        if (this.client == null)
            throw Error('Database connection not initialized, call init() first');
        return this.client;
    }
    async queryCollection(collection, query = null) {
        this.initIfNeeded();
        if (query == null) {
            const cursor = this.client.db("test_db").collection(collection).find();
            return await cursor.toArray();
        }
        const cursor = this.client.db("test_db").collection(collection).find(query);
        return await cursor.toArray();
    
        //return await client.db("test_db").collection(collection).findOne(query);
    }
    async initIfNeeded() {
        if (this.client == null)
            await this.init();
    }
    async createDocument(collection, contactJson) {
        this.initIfNeeded();
        const cursor = await this.client.db("test_db").collection(collection).insertOne(contactJson);
        console.log("createDocument cursor: ", cursor);
    }
    async updateDocument(query, collection, contactJson) {
        this.initIfNeeded();
        const cursor = await this.client.db("test_db").collection(collection).replaceOne(query, contactJson);
        console.log("updateDocument cursor: ", cursor);
    }
    async deleteDocument(query, collection) {
        this.initIfNeeded();
        const cursor = await this.client.db("test_db").collection(collection).deleteOne(query);
        console.log("deleteDocument cursor: ", cursor);
    }
}

module.exports = {
    DBConnection
};

/* Before refactoring to be able to use a single database connection
class DBConnection {
    DBConnection() {
        this.client = null;
    }
    async init(callback = doNothing) {
        if (this.client != null) {
            console.log('Be aware that database connection is already initialized');
            callback()
            return this.client;
        }
        try {
            console.log("connectionString: ", connectionString);
            this.client = new MongoClient(connectionString);
            await this.client.connect();
            callback();
        } catch (e) {
            console.log(e);
        }
    }
    getClient() {
        if (this.client == null)
            throw Error('Database connection not initialized, call init() first');
        return this.client;
    }
}
function doNothing() {

}
async function getNewClient() {
    const dbConnection = new DBConnection();
    await dbConnection.init();
    return dbConnection.getClient();
}
async function queryCollection(collection, query = null) {
    const client = await getNewClient();

    if (query == null) {
        const cursor = client.db("test_db").collection(collection).find();
        return await cursor.toArray();
    }
    const cursor = client.db("test_db").collection(collection).find(query);
    return await cursor.toArray();

    //return await client.db("test_db").collection(collection).findOne(query);
}

module.exports = {
    DBConnection,
    getNewClient,
    queryCollection
};
*/