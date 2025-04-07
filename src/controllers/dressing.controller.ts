import { ObjectId } from 'mongodb';
import { deleteInMongo, findInCollection, save, update } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import VetementModel, { mongoModelToVetementModel, vetementModelToMongoModel } from '../models/vetements.model';
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





/**
 * Récupère la liste des dressings depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function getVetements(idDressing : string): Promise<VetementModel[]> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.VETEMENTS, { 'dressing.id': new ObjectId(idDressing) })
      .then((mongoVetements) => {
        resolve(mongoVetements.map((mongoTypeVetement: any) => mongoModelToVetementModel(mongoTypeVetement)));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des vêtements', err);
        reject(new Error('Erreur lors de la récupération des vêtements' + err));
      });
  });
}


/**
 * Enregistre un vêtement dans la collection MongoDB spécifiée.
 *
 * @param {any} vetement - L'objet vêtement à enregistrer.
 * @returns {Promise<string | null>} Une promesse qui résout à une chaîne de caractères (ID du vêtement enregistré) ou null en cas d'échec.
 */
export function saveVetement(vetement: VetementModel): Promise<string | null> {
  return save(vetementModelToMongoModel(vetement), MONGO_DB_COLLECTIONS.VETEMENTS);
}



/**
 * Enregistre un vêtement dans la collection MongoDB spécifiée.
 *
 * @param {any} vetement - L'objet vêtement à enregistrer.
 * @returns {Promise<string | null>} Une promesse qui résout à une chaîne de caractères (ID du vêtement enregistré) ou null en cas d'échec.
 */
export function updateVetement(vetement: VetementModel, idVetement: string): Promise<string | null> {
  return update(vetementModelToMongoModel(vetement), idVetement, MONGO_DB_COLLECTIONS.VETEMENTS);
}


/**
 * Supprime un vêtement d'un dressing spécifique dans la base de données.
 *
 * @param idDressing - L'identifiant unique du dressing auquel appartient le vêtement.
 * @param idVetement - L'identifiant unique du vêtement à supprimer.
 * @returns Une promesse qui résout à `true` si la suppression a réussi, sinon `false`.
 */
export function deleteVetement(idDressing: string, idVetement: string): Promise<boolean> {
  const criteres = 
    { 
      'dressing.id': new ObjectId(idDressing), 
      "_id" : new ObjectId(idVetement) 
    } ;
  return deleteInMongo(criteres, MONGO_DB_COLLECTIONS.VETEMENTS);
}