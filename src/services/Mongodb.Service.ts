import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_DB_COLLECTIONS, MONGO_DB_DATABASE_NAME, MONGO_DB_URI } from '../constants/AppConstants';


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client : MongoClient = new MongoClient(MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  let conn;
  try {
    conn = await client.connect();
  } catch(e) {
    console.error(e);
  }
  let db = conn ? conn.db(MONGO_DB_DATABASE_NAME) : null;
  if(db === null) {
    console.error("No database connection");
  }
  else {
    collections.typesVetements = db.collection(MONGO_DB_COLLECTIONS.TYPES_VETEMENTS);
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.typesVetements.collectionName}`);
  }
  return db;
}
connectToDatabase();
export const collections: { typesVetements?: Collection } = {}