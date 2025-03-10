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

let connexion : any;


export const collections: {
  paramTypesVetements?  : Collection,
  paramTaillesMesures?  : Collection,
  paramUsagesVetements? : Collection,
  paramEtatsVetements?  : Collection,  
  vetements?: Collection
} = {};

/**
 * 
 * @returns ci-dessous la fonction connectToDatabase() qui permet de se connecter à la base de données MongoDB
 */
export async function connectToDatabase(collectionName: MONGO_DB_COLLECTIONS): Promise<Collection | null> {
  if(!connexion){
    try {
      connexion = await client.connect();
    } catch (e) {
      console.error("Erreur de connexion à ATLAS " + MONGO_DB_URI + "/" + MONGO_DB_DATABASE_NAME, e);
    }
  }
  let db = connexion ? connexion.db(MONGO_DB_DATABASE_NAME) : null;
  if (db === null) {
    console.error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME);
    return null;
  } else {
    console.log(`Connexion réussie à la base de données [${db.databaseName}]`);
    return db.collection(collectionName);
  }
}


/**
 * Recherche des documents dans une collection MongoDB spécifiée en fonction d'un filtre donné.
 *
 * @param {MONGO_DB_COLLECTIONS} collectionName - Le nom de la collection MongoDB dans laquelle effectuer la recherche.
 * @param {any} filter - Le filtre à appliquer pour la recherche des documents.
 * @returns {Promise<any>} Une promesse qui résout avec les documents trouvés ou null si la collection n'existe pas.
 */
export async function findInCollection(collectionName: MONGO_DB_COLLECTIONS, filter: any): Promise<any> {
  const collection = await connectToDatabase(collectionName);
  if (collection) {
    return collection.find(filter).toArray();
  } else {
    return null;
  }
}