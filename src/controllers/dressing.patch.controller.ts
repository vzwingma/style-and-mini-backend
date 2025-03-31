import { ObjectId } from 'mongodb';
import { findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import VetementModel, { mongoModelToVetementModel } from '../models/vetements.model';
import { v7 as uuidGen } from 'uuid';
import { updateVetement } from './dressing.controller';



/**
 * Récupère la liste des dressings depuis la collection MongoDB.
 *
 * @returns {Promise<any>} Une promesse qui se résout avec le résultat de la collection ou se rejette avec une erreur.
 */
export function patchVetements(idDressing : string): Promise<VetementModel[]> {
  return new Promise((resolve, reject) => {
    findInCollection(MONGO_DB_COLLECTIONS.VETEMENTS, { 'dressing.id': new ObjectId(idDressing) })
      .then((mongoVetements : any) => {
          const vetements = mongoVetements.map((mongoTypeVetement: any) => mongoModelToVetementModel(mongoTypeVetement));
          resolve(vetements
                  .filter((vetement : any) => { return vetement.image != null && typeof vetement.image === 'string'})
                  .map((vetement : any) => {
                    console.log('Vetement AVANT', vetement);
                     vetement.image = {
                        id : uuidGen().replace(/-/g, "").substring(0, 24),
                        contenu : vetement.image,
                        hauteur : 1000,
                        largeur : 1000
                     }
                     return vetement;
                    }
                  ).map((vetement : any) => {
                    console.log('Vetement APRES', vetement);

                    return updateVetement(vetement, vetement.id).then((idVetement) => {
                      console.log('Vêtement [', idVetement, '] modifié dans le dressing [', idDressing, ']');
                  })
                }));
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des dressings', err);
        reject(null);
      });
  });
}