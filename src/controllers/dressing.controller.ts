import { ObjectId } from 'mongodb';
import { findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import DressingModel, { mongoModelToDressingModel } from '../models/dressing.model';


/**
 * Récupère la liste des dressings depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function getDressings(): Promise<DressingModel> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.DRESSING, { })
      .then((mongoDressings) => {
        resolve(mongoDressings.map((mongoDressing: any) => mongoModelToDressingModel(mongoDressing)));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des dressings', err);
        reject(new Error('Erreur lors de la récupération des dressings' + err));
      });
  });
}


/**
 * Récupère un dressing par son identifiant.
 *
 * @param {string} dressingId - L'identifiant du dressing à récupérer.
 * @returns {Promise<any>} Une promesse qui se résout avec le dressing correspondant à l'identifiant fourni, ou se rejette avec `null` en cas d'erreur.
 */
export function getDressingById(dressingId: string): Promise<DressingModel> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.DRESSING, { '_id': new ObjectId(dressingId) })
      .then((mongoDressings) => {
        resolve(mongoModelToDressingModel(mongoDressings[0]));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération du dressing', err);
        reject(new Error('Erreur lors de la récupération du dressing' + err));
      });
  });
}