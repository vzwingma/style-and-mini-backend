import { ObjectId } from 'mongodb';
import { deleteInMongo, findInCollection, save, update } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import CapsuleModel, { capsuleModelToMongoModel, mongoModelToCapsuleModel } from '../models/capsules/capsules.model';



/**
 * Récupère la liste des capsules depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function getCapsules(idDressing : string): Promise<CapsuleModel[]> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.CAPSULES, { 'dressing.id': new ObjectId(idDressing) })
      .then((mongoCapsules) => {
        resolve(mongoCapsules.map((mongoCapsule: any) => mongoModelToCapsuleModel(mongoCapsule)));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des capsules', err);
        reject(new Error('Erreur lors de la récupération des capsules' + err));
      });
  });
}


/**
 * Sauvegarde une capsule dans la base de données MongoDB.
 *
 * @param capsule - Le modèle de capsule à sauvegarder.
 * @returns Une promesse contenant l'identifiant de la tenue sauvegardée.
 */
export function saveCapsule(capsule: CapsuleModel): Promise<string> {
  return save(capsuleModelToMongoModel(capsule), MONGO_DB_COLLECTIONS.CAPSULES);
}



/**
 * Met à jour une capsule dans la base de données.
 *
 * @param capsule - Le modèle de tenue à mettre à jour.
 * @param idCapsule - L'identifiant unique de la tenue à mettre à jour.
 * @returns Une promesse qui résout avec une chaîne de caractères indiquant le résultat de l'opération.
 */
export function updateCapsule(capsule: CapsuleModel, idCapsule: string): Promise<string> {
  return update(capsuleModelToMongoModel(capsule), idCapsule, MONGO_DB_COLLECTIONS.CAPSULES);
}


/**
 * Supprime un vêtement d'un dressing spécifique dans la base de données.
 *
 * @param idDressing - L'identifiant unique du dressing auquel appartient le vêtement.
 * @param idTenue - L'identifiant unique du vêtement à supprimer.
 * @returns Une promesse qui résout à `true` si la suppression a réussi, sinon `false`.
 */
export function deleteCapsule(idDressing: string, idCapsule: string): Promise<boolean> {
  const criteres = 
    { 
      'dressing.id': new ObjectId(idDressing), 
      "_id" : new ObjectId(idCapsule) 
    } ;
  return deleteInMongo(criteres, MONGO_DB_COLLECTIONS.CAPSULES);
}