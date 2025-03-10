import { ObjectId } from 'mongodb';
import { collections, findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';





/**
 * Récupère la liste des dressings depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function getDressings(): Promise<any> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.DRESSING, { })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des dressings', err);
        reject(null);
      });
  });
}


/**
 * Récupère un dressing par son identifiant.
 *
 * @param {string} dressingId - L'identifiant du dressing à récupérer.
 * @returns {Promise<any>} Une promesse qui se résout avec le dressing correspondant à l'identifiant fourni, ou se rejette avec `null` en cas d'erreur.
 */
export function getDressingById(dressingId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.DRESSING, { '_id': new ObjectId(dressingId) })
      .then((result) => {
        resolve(result[0]);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération du dressing', err);
        reject(null);
      });
  });
}


/**
 * Enregistre un vêtement dans la collection des vêtements.
 *
 * @param dressingById - L'identifiant du dressing auquel le vêtement appartient.
 * @param vetement - Les détails du vêtement à enregistrer.
 * @param vetementId - (Optionnel) L'identifiant du vêtement à mettre à jour. Si non fourni, un nouveau vêtement sera inséré.
 * @returns Une promesse qui se résout à `true` si l'enregistrement est réussi, ou se rejette avec `false` en cas d'erreur.
 */
export function saveVetement(vetement: any, vetementId?: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (collections.vetements) {
      console.log('[MongoDB] Save Vetement', vetement);

      if (vetementId) {
        collections.vetements.updateOne({ '_id': new ObjectId(vetementId) }, { $set: { ...vetement } })
          .then(() => {
            resolve(vetementId);
          })
          .catch((e) => {
            console.error("[MongoDB] Erreur lors de l'enregistrement du vêtement", e);
            reject(null);
          });
      } else {
        collections.vetements.insertOne({ ...vetement })
          .then((result) => {
            resolve(result.insertedId.toString());
          })
          .catch((e) => {
            console.error("[MongoDB] Erreur lors de l'enregistrement du vêtement", e);
            reject(null);
          });
      }
    } else {
      reject(null);
    }
  });
}
