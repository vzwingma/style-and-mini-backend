import { deleteInMongo, save, update } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import { ParametragesVetementEnum } from '../constants/AppEnum';
import ParamGenericVetementsModel, { transformMongoModelToParametrageModel, transformParametrageModelToMongoModel } from '../models/params/paramGenericVetements.model';
import { ObjectId } from 'mongodb';
import { loadParametrages } from '../services/params.service';




/**
 * Retourne la collection MongoDB correspondante au type de paramétrage spécifié.
 *
 * @param typeParam - Le type de paramétrage à utiliser, basé sur l'énumération `ParametragesVetementEnum`.
 * @returns La collection MongoDB correspondante de type `MONGO_DB_COLLECTIONS`, ou `null` si le type de paramétrage n'est pas reconnu.
 */
const getCollectionTypeParametrage = (typeParam: ParametragesVetementEnum): MONGO_DB_COLLECTIONS | null => {
  switch (typeParam) {
    case ParametragesVetementEnum.TYPES:
      return MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS;
    case ParametragesVetementEnum.TAILLES:
      return MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES;
    case ParametragesVetementEnum.USAGES:
      return MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS;
    case ParametragesVetementEnum.ETATS:
      return MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS;
    case ParametragesVetementEnum.MARQUES:
      return MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS;
    default:
      return null;
  }
}


/**
 * Récupère les paramètres des vêtements en fonction du type spécifié.
 *
 * @param typeParams - Le type de paramètre à récupérer, basé sur l'énumération `ParametragesVetementEnum`.
 * @returns Une promesse résolvant un tableau de modèles génériques de paramètres de vêtements (`ParamGenericVetementsModel[]`).
 * @throws Une erreur si le type de paramètre est inconnu.
 */
export function getParametresVetements(typeParams: ParametragesVetementEnum): Promise<ParamGenericVetementsModel[]> {
  const collection = getCollectionTypeParametrage(typeParams);
  
  if(collection === undefined || collection === null) {
    throw new Error('Type de paramètre inconnu : ' + typeParams);
  }
  return loadParametrages(collection, typeParams)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => transformMongoModelToParametrageModel(typeParams, mongoTypeVetement));
    });
  };


/**
 * Enregistre un vêtement dans la collection MongoDB spécifiée.
 *
 * @param {any} vetement - L'objet vêtement à enregistrer.
 * @returns {Promise<string | null>} Une promesse qui résout à une chaîne de caractères (ID du vêtement enregistré) ou null en cas d'échec.
 */
export function saveParametrage(typeParametrage: ParametragesVetementEnum, parametrage: ParamGenericVetementsModel): Promise<string | null> {
  return save(transformParametrageModelToMongoModel(typeParametrage, parametrage), getCollectionTypeParametrage(typeParametrage) as MONGO_DB_COLLECTIONS);
}



/**
 * Enregistre un vêtement dans la collection MongoDB spécifiée.
 *
 * @param {any} vetement - L'objet vêtement à enregistrer.
 * @returns {Promise<string | null>} Une promesse qui résout à une chaîne de caractères (ID du vêtement enregistré) ou null en cas d'échec.
 */
export function updateParametrage(typeParametrage: ParametragesVetementEnum, parametrage: ParamGenericVetementsModel, idParametrage: string): Promise<string | null> {
  return update(transformParametrageModelToMongoModel(typeParametrage, parametrage), idParametrage, getCollectionTypeParametrage(typeParametrage) as MONGO_DB_COLLECTIONS);
}


/**
 * Supprime un paramétrage de vêtement dans la collection MongoDB spécifiée.
 * @param typeParametrage spécifie le type de paramétrage à supprimer
 * @param idParametrage identifiant du paramétrage à supprimer
 * @returns {Promise<boolean>} une promesse qui résout à true si la suppression a réussi, sinon false
 */
export function deleteParametrage(typeParametrage: ParametragesVetementEnum, idParametrage: string): Promise<boolean> {
    const criteres = 
      { 
        "_id" : new ObjectId(idParametrage) 
      } ;
  return deleteInMongo(criteres, getCollectionTypeParametrage(typeParametrage) as MONGO_DB_COLLECTIONS);
}