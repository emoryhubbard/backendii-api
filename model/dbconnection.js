const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
const MongoClient = require('mongodb').MongoClient;

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