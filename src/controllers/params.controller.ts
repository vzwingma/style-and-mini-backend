import { findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import { ParametragesVetementEnum } from '../constants/AppEnum';
import ParamGenericVetementsModel from '../models/params/paramGenericVetements.model';





/**
 * Récupère les paramètres des vêtements en fonction du type spécifié.
 *
 * @param typeParams - Le type de paramètre à récupérer, basé sur l'énumération `ParametragesVetementEnum`.
 * @returns Une promesse résolvant un tableau de modèles génériques de paramètres de vêtements (`ParamGenericVetementsModel[]`).
 * @throws Une erreur si le type de paramètre est inconnu.
 */
export function getParametresVetements(typeParams : ParametragesVetementEnum): Promise<ParamGenericVetementsModel[]> {
  switch (typeParams) {
    case ParametragesVetementEnum.TYPE:
      return getParamsTypesVetement();
    case ParametragesVetementEnum.TAILLES:
      return getParamsTaillesVetement();
    case ParametragesVetementEnum.USAGES:
      return getParamsUsagesVetement();
    case ParametragesVetementEnum.ETATS:
      return getParamsEtatsVetement();
    case ParametragesVetementEnum.MARQUES:
      return getParamsMarquesVetement();
    default:
      return Promise.reject(new Error('Type de paramètre inconnu : ' + typeParams));
  }
}


/**
 * Récupère les paramètres des vêtements depuis une collection MongoDB.
 *
 * @param {MONGO_DB_COLLECTIONS} paramCollections - La collection MongoDB à partir de laquelle récupérer les paramètres.
 * @returns {Promise<any>} Une promesse qui se résout avec les résultats de la collection ou se rejette avec une erreur.
 */
function loadParametrages(paramCollections: MONGO_DB_COLLECTIONS): Promise<any> {
  return new Promise((resolve, reject) => {
    findInCollection(paramCollections, {})
      .then((result) => resolve(result))
      .catch((err) => {
        console.error('Erreur lors de la récupération depuis' + paramCollections, err);
        reject(new Error('Erreur lors de la récupération depuis' + paramCollections + err));
      });
  });
}



/**
 * Récupère les types de vêtements à partir de la collection MongoDB spécifiée.
 *
 * @returns {Promise<ParamTypeVetementsModel[]>} Une promesse qui résout avec une liste de modèles de types de vêtements.
 * En cas d'erreur, la promesse résout avec null.
 */
export function getParamsTypesVetement(): Promise<ParamGenericVetementsModel[]> {
  return loadParametrages(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        let typeVetement: ParamGenericVetementsModel = {
          id        : mongoTypeVetement._id.toString(),
          libelle   : mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
          type      : mongoTypeVetement.type
        };
        return typeVetement;
      });
    });
}



/**
 * Récupère les paramètres des tailles de vêtements depuis la base de données.
 *
 * @returns {Promise<any>} Une promesse qui résout avec une liste des paramètres de tailles de vêtements,
 * ou `null` en cas d'erreur.
 */
export function getParamsTaillesVetement(): Promise<ParamGenericVetementsModel[]> {
  return loadParametrages(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES)
    .then((result) => {
      const listeParamsTaillesMesures = result.map((mongoTypeVetement: any) => {
        let tailleVetement: ParamGenericVetementsModel = {
          id        : mongoTypeVetement._id.toString(),
          libelle   : mongoTypeVetement.libelle,
          categories: typeof mongoTypeVetement.categorie === 'string' ? [mongoTypeVetement.categorie] : mongoTypeVetement.categorie,
          tri       : mongoTypeVetement.tri,
          type      : mongoTypeVetement.type,
        };
        return tailleVetement;
      });
      return listeParamsTaillesMesures;
    });
}



/**
 * Récupère les paramètres des états des vêtements depuis la base de données.
 *
 * @returns {Promise<ParamEtatVetementsModel[]>} Une promesse contenant une liste de modèles ParamEtatVetementsModel.
 * Si une erreur survient, la promesse retourne null.
 */
export function getParamsEtatsVetement(): Promise<ParamGenericVetementsModel[]> {
  return loadParametrages(MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        let etatVetement: ParamGenericVetementsModel = {
          id          : mongoTypeVetement._id.toString(),
          libelle     : mongoTypeVetement.libelle,
          tri         : mongoTypeVetement.tri,
          categories  : mongoTypeVetement.categories,
        };
        return etatVetement;
      });
    });
}



/**
 * Récupère les usages des vêtements depuis la base de données MongoDB.
 *
 * @returns {Promise<ParamUsageVetementsModel[]>} Une promesse qui résout avec une liste de modèles ParamUsageVetementsModel.
 * Si une erreur survient, la promesse résout avec null.
 */
export function getParamsUsagesVetement(): Promise<ParamGenericVetementsModel[]> {
  return loadParametrages(MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS)
    .then((result) => {
      const listeParamsUsages = result.map((mongoTypeVetement: any) => {
        let usageVetement: ParamGenericVetementsModel = {
          id          : mongoTypeVetement._id.toString(),
          libelle     : mongoTypeVetement.libelle,
          categories  : mongoTypeVetement.categories,
        };
        return usageVetement;
      });
      return listeParamsUsages;
    });
}


/**
 * Récupère les marques des vêtements depuis la base de données MongoDB.
 *
 * @returns {Promise<ParamUsageVetementsModel[]>} Une promesse qui résout avec une liste de modèles ParamUsageVetementsModel.
 * Si une erreur survient, la promesse résout avec null.
 */
export function getParamsMarquesVetement(): Promise<ParamGenericVetementsModel[]> {
  return loadParametrages(MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        let marqueVetement: ParamGenericVetementsModel = {
          id        : mongoTypeVetement._id.toString(),
          libelle   : mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
          type      : mongoTypeVetement.type
        };
        return marqueVetement;
      });
    });

}