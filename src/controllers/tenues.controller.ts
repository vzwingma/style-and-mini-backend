import { ObjectId } from 'mongodb';
import { deleteInMongo, findInCollection, save, update } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import TenueModel, { mongoModelToTenueModel, tenueModelToMongoModel } from '../models/tenues/tenues.model';



/**
 * Récupère la liste des dressings depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function getTenues(idDressing : string): Promise<TenueModel[]> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.TENUES, { 'dressing.id': new ObjectId(idDressing) })
      .then((mongoTenues) => {
        resolve(mongoTenues.map((mongoTenue: any) => mongoModelToTenueModel(mongoTenue)));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des tenues', err);
        reject(new Error('Erreur lors de la récupération des tenues' + err));
      });
  });
}


/**
 * Sauvegarde une tenue dans la base de données MongoDB.
 *
 * @param tenue - Le modèle de tenue à sauvegarder.
 * @returns Une promesse contenant l'identifiant de la tenue sauvegardée.
 */
export function saveTenue(tenue: TenueModel): Promise<string> {
  return save(tenueModelToMongoModel(tenue), MONGO_DB_COLLECTIONS.TENUES);
}



/**
 * Met à jour une tenue dans la base de données.
 *
 * @param tenue - Le modèle de tenue à mettre à jour.
 * @param idVetement - L'identifiant unique de la tenue à mettre à jour.
 * @returns Une promesse qui résout avec une chaîne de caractères indiquant le résultat de l'opération.
 */
export function updateTenue(tenue: TenueModel, idVetement: string): Promise<string> {
  return update(tenueModelToMongoModel(tenue), idVetement, MONGO_DB_COLLECTIONS.TENUES);
}


/**
 * Supprime un vêtement d'un dressing spécifique dans la base de données.
 *
 * @param idDressing - L'identifiant unique du dressing auquel appartient le vêtement.
 * @param idTenue - L'identifiant unique du vêtement à supprimer.
 * @returns Une promesse qui résout à `true` si la suppression a réussi, sinon `false`.
 */
export function deleteTenue(idDressing: string, idTenue: string): Promise<boolean> {
  const criteres = 
    { 
      'dressing.id': new ObjectId(idDressing), 
      "_id" : new ObjectId(idTenue) 
    } ;
  return deleteInMongo(criteres, MONGO_DB_COLLECTIONS.TENUES);
}