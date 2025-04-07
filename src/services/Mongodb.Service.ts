import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
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
      console.log("Connexion réussie à la base de données", connexion?.options.appName);
    } catch (e) {
      console.error("Erreur de connexion à ATLAS " + MONGO_DB_URI + "/" + MONGO_DB_DATABASE_NAME, e);
    }
  }
  let db = connexion ? connexion.db(MONGO_DB_DATABASE_NAME) : null;
  if (db === null) {
    console.error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME);
    return null;
  } else {

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
  console.log('[MongoDB] findInCollection', collectionName, "critères:", filter);
  const collection = await connectToDatabase(collectionName);
  if (collection) {
    return collection.find(filter).toArray();
  } else {
    return null;
  }
}

/**
 * Enregistre un document MongoDB dans une collection spécifiée.
 *
 * @param mongoDocument - Le document MongoDB à enregistrer.
 * @param collectionName - Le nom de la collection MongoDB où le document sera enregistré.
 * @returns Une promesse qui résout avec l'ID du document inséré sous forme de chaîne de caractères, ou null en cas d'erreur.
 */
export function save(mongoDocument: any, collectionName : MONGO_DB_COLLECTIONS): Promise<string | null> {
  return new Promise((resolve, reject) => {

      console.log('[MongoDB] Save mongoDocument');
      connectToDatabase(collectionName).then((collection) => {
        if (collection) {
          collection.insertOne({ ...mongoDocument })
            .then((result) => {
              resolve(result.insertedId.toString());
            })
            .catch((e) => {
              console.error("[MongoDB] Erreur lors de l'enregistrement du document", e);
              reject(new Error('Erreur lors de l\'enregistrement du document' + e));
            });
        } else {
          reject(new Error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME)); 
        }
      }
      );
  }
  );
}


/**
 * Enregistre un document MongoDB dans une collection spécifiée.
 *
 * @param mongoDocument - Le document MongoDB à enregistrer.
 * @param collectionName - Le nom de la collection MongoDB où le document sera enregistré.
 * @returns Une promesse qui résout avec l'ID du document inséré sous forme de chaîne de caractères, ou null en cas d'erreur.
 */
export function update(mongoDocument: any, mongoId: string, collectionName : MONGO_DB_COLLECTIONS): Promise<string | null> {
  return new Promise((resolve, reject) => {

      console.log('[MongoDB] Update mongoDocument', JSON.stringify(mongoDocument));
      connectToDatabase(collectionName).then((collection) => {
        if (collection) {
          collection.updateOne({ '_id': new ObjectId(mongoId) }, { $set: { ...mongoDocument } })
            .then((result) => {
              resolve(result.upsertedId ? result.upsertedId.toString() : mongoId);
            })
            .catch((e) => {
              console.error("[MongoDB] Erreur lors de l'enregistrement du document", e);
              reject(new Error('Erreur lors de l\'enregistrement du document' + e));
            });
        } else {
          reject(new Error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME)); 
        }
      }
      );
  });
}




/**
 * Enregistre un document MongoDB dans une collection spécifiée.
 *
 * @param mongoDocument - Le document MongoDB à enregistrer.
 * @param collectionName - Le nom de la collection MongoDB où le document sera enregistré.
 * @returns Une promesse qui résout avec l'ID du document inséré sous forme de chaîne de caractères, ou null en cas d'erreur.
 */
export function deleteInMongo(criteres: any, collectionName : MONGO_DB_COLLECTIONS): Promise<boolean> {
  return new Promise((resolve, reject) => {

      console.log('[MongoDB] Delete mongoDocument', criteres);
      connectToDatabase(collectionName).then((collection) => {
        if (collection) {
          collection.deleteOne(criteres)
            .then((result) => {
              resolve(result.acknowledged);
            })
            .catch((e) => {
              console.error("[MongoDB] Erreur lors de la suppression du document", e);
              reject(new Error('Erreur lors de la suppression du document' + e));
            });
        } else {
          reject(new Error('Erreur de connexion à la base de données ' + MONGO_DB_DATABASE_NAME)); 
        }
      }
      );
  });
}

