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

/**
 * 
 * @returns ci-dessous la fonction connectToDatabase() qui permet de se connecter à la base de données MongoDB
 */
async function connectToDatabase() {
  let conn;
  try {
    conn = await client.connect();
  } catch(e) {
    console.error(e);
  }
  let db = conn ? conn.db(MONGO_DB_DATABASE_NAME) : null;
  if(db === null) {
    console.error("Erreur de connexion à la base de données");
  }
  else {
    collections.paramTypesVetements = db.collection(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS);
    collections.paramTaillesMesures = db.collection(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES);
    console.log(`Connexion réussie à la base de données [${db.databaseName}]` );
  }
  return db;
}
connectToDatabase();
export const collections: { paramTypesVetements?: Collection, paramTaillesMesures?: Collection } = {}