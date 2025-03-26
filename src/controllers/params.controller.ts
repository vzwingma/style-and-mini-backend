import { findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import ParamTypeVetementsModel from '../models/paramTypeVetements.model';
import ParamTailleVetementsModel from '../models/paramTailleVetements.model';
import ParamUsageVetementsModel from '../models/paramUsageVetements.model';
import ParamEtatVetementsModel from '../models/paramEtatVetements.model';
import ParamMarqueVetementsModel from '../models/paramMarqueVetements.model';






/**
 * Récupère les paramètres des vêtements depuis une collection MongoDB.
 *
 * @param {MONGO_DB_COLLECTIONS} paramCollections - La collection MongoDB à partir de laquelle récupérer les paramètres.
 * @returns {Promise<any>} Une promesse qui se résout avec les résultats de la collection ou se rejette avec une erreur.
 */
function getParamsVetements(paramCollections: MONGO_DB_COLLECTIONS): Promise<any> {
  return new Promise((resolve, reject) => {
    findInCollection(paramCollections, {})
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération depuis' + paramCollections, err);
        reject(null);
      });
  });
}


/**
 * Récupère les types de vêtements à partir de la collection MongoDB spécifiée.
 *
 * @returns {Promise<ParamTypeVetementsModel[]>} Une promesse qui résout avec une liste de modèles de types de vêtements.
 * En cas d'erreur, la promesse résout avec null.
 */
export function getParamsTypesVetement(): Promise<ParamTypeVetementsModel[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        let typeVetement: ParamTypeVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
          typeTaille: mongoTypeVetement.typeTaille,
        };
        return typeVetement;
      });
    })
    .catch(() => {
      return null;
    });
}



/**
 * Récupère les paramètres des tailles de vêtements depuis la base de données.
 *
 * @returns {Promise<any>} Une promesse qui résout avec une liste des paramètres de tailles de vêtements,
 * ou `null` en cas d'erreur.
 */
export function getParamsTaillesVetement(): Promise<ParamTailleVetementsModel[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES)
    .then((result) => {
      const listeParamsTaillesMesures = result.map((mongoTypeVetement: any) => {
        let tailleVetement: ParamTailleVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: typeof mongoTypeVetement.categorie === 'string' ? [mongoTypeVetement.categorie] : mongoTypeVetement.categorie,
          tri: mongoTypeVetement.tri,
          type: mongoTypeVetement.type,
        };
        return tailleVetement;
      });
      return listeParamsTaillesMesures;
    })
    .catch(() => {
      return null;
    });
}



/**
 * Récupère les paramètres des états des vêtements depuis la base de données.
 *
 * @returns {Promise<ParamEtatVetementsModel[]>} Une promesse contenant une liste de modèles ParamEtatVetementsModel.
 * Si une erreur survient, la promesse retourne null.
 */
export function getParamsEtatsVetement(): Promise<ParamEtatVetementsModel[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS)
    .then((result) => {
      const listeParamsEtatsVetements = result.map((mongoTypeVetement: any) => {
        let etatVetement: ParamEtatVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          tri: mongoTypeVetement.tri,
          categories: mongoTypeVetement.categories,
        };
        return etatVetement;
      });
      return listeParamsEtatsVetements;
    })
    .catch(() => {
      return null;
    });
}



/**
 * Récupère les usages des vêtements depuis la base de données MongoDB.
 *
 * @returns {Promise<ParamUsageVetementsModel[]>} Une promesse qui résout avec une liste de modèles ParamUsageVetementsModel.
 * Si une erreur survient, la promesse résout avec null.
 */
export function getParamsUsagesVetement(): Promise<ParamUsageVetementsModel[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS)
    .then((result) => {
      const listeParamsUsages = result.map((mongoTypeVetement: any) => {
        let usageVetement: ParamUsageVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
        };
        return usageVetement;
      });
      return listeParamsUsages;
    })
    .catch(() => {
      return null;
    });
}


/**
 * Récupère les marques des vêtements depuis la base de données MongoDB.
 *
 * @returns {Promise<ParamUsageVetementsModel[]>} Une promesse qui résout avec une liste de modèles ParamUsageVetementsModel.
 * Si une erreur survient, la promesse résout avec null.
 */
export function getParamsMarquesVetement(): Promise<ParamMarqueVetementsModel[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS)
    .then((result) => {
      const listeParamsMarques = result.map((mongoTypeVetement: any) => {
        let marqueVetement: ParamMarqueVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
        };
        return marqueVetement;
      });
      return listeParamsMarques;
    })
    .catch(() => {
      return null;
    });

}