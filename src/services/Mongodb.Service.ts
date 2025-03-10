import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_DB_COLLECTIONS, MONGO_DB_DATABASE_NAME, MONGO_DB_URI } from '../constants/AppConstants';


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client: MongoClient = new MongoClient(MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const collections: {
  paramTypesVetements?  : Collection,
  paramTaillesMesures?  : Collection,
  paramUsagesVetements? : Collection,
  paramEtatsVetements?  : Collection,  
  dressing? : Collection,
  vetements?: Collection
} = {};

/**
 * 
 * @returns ci-dessous la fonction connectToDatabase() qui permet de se connecter à la base de données MongoDB
 */
export async function connectToDatabase() {
  let conn;
  console.log("Connection au cluster MongoDB " + MONGO_DB_URI + "/" + MONGO_DB_DATABASE_NAME);
  try {
    conn = await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Deployment pinged - Connecté au cluster MongoDB");
  } catch (e) {
    console.error("Erreur de connexion à ATLAS " + MONGO_DB_URI + "/" + MONGO_DB_DATABASE_NAME, e);
  }
  let db = conn ? conn.db(MONGO_DB_DATABASE_NAME) : null;
  if (db === null) {
    console.error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME);
  } else {
    collections.paramTypesVetements   = db.collection(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS);
    collections.paramTaillesMesures   = db.collection(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES);
    collections.paramUsagesVetements  = db.collection(MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS);
    collections.paramEtatsVetements   = db.collection(MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS);    
    collections.dressing = db.collection(MONGO_DB_COLLECTIONS.DRESSING);
    collections.vetements = db.collection(MONGO_DB_COLLECTIONS.VETEMENTS);
    console.log(`Connexion réussie à la base de données [${db.databaseName}]`);
  }
  return db;
}

