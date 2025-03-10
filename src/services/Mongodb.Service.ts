import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_DB_DATABASE_NAME, MONGO_DB_URI } from '../constants/AppConstants';


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
export async function connectToDatabase(collectionName: string): Promise<Collection | null> {
  let conn;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error("Erreur de connexion à ATLAS " + MONGO_DB_URI + "/" + MONGO_DB_DATABASE_NAME, e);
  }
  let db = conn ? conn.db(MONGO_DB_DATABASE_NAME) : null;
  if (db === null) {
    console.error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME);
    return null;
  } else {
    console.log(`Connexion réussie à la base de données [${db.databaseName}]`);
    return db.collection(collectionName);
  }
}