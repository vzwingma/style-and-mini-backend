import { findInCollection, update } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';
import { TypeTailleEnum } from '../constants/AppEnum';
import ParamTypeVetementsModel from '../models/params/paramTypeVetements.model';
import ParamTailleVetementsModel from '../models/params/paramTailleVetements.model';
import ParamMarqueVetementsModel from '../models/params/paramMarqueVetements.model';



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
 * @returns {Promise<any[]>} Une promesse qui résout avec une liste de modèles de types de vêtements.
 * En cas d'erreur, la promesse résout avec null.
 */
export function patchParamsTypesVetement(): Promise<any[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS)
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        switch (mongoTypeVetement.typeTaille) {
          case TypeTailleEnum.TAILLE:
            mongoTypeVetement.type = TypeTailleEnum.VETEMENTS;
            break;
          case TypeTailleEnum.POINTURE:
            mongoTypeVetement.type = TypeTailleEnum.CHAUSSURES;
            break;
          default:
            break;
        }
        delete mongoTypeVetement.typeTaille;
        return mongoTypeVetement;
      })
    })
    .then((result) => {
      return result.map((mongoTypeVetement: any) => {
        return update(mongoTypeVetement, mongoTypeVetement._id.toString(), MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS)
      })
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
export function patchParamsTaillesVetement(): Promise<any[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES)
    .then((result) => {
      return result.map((mongoTailleVetement: any) => {
        switch (mongoTailleVetement.type) {
          case TypeTailleEnum.TAILLE:
            mongoTailleVetement.type = TypeTailleEnum.VETEMENTS;
            break;
          case TypeTailleEnum.POINTURE:
            mongoTailleVetement.type = TypeTailleEnum.CHAUSSURES;
            break;
          default:
            break;
        }
        return mongoTailleVetement;
      })
    })
    .then((result) => {
      return result.map((mongoTailleVetement: any) => {
        return update(mongoTailleVetement, mongoTailleVetement._id.toString(), MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES)
      })
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
export function patchParamsMarquesVetement(): Promise<any[]> {
  return getParamsVetements(MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS)
    .then((result) => {
      return result.map((mongoMarqueVetement: any) => {
        switch (mongoMarqueVetement.typeTaille) {
          case TypeTailleEnum.TAILLE:
            mongoMarqueVetement.type = TypeTailleEnum.VETEMENTS;
            break;
          case TypeTailleEnum.POINTURE:
            mongoMarqueVetement.type = TypeTailleEnum.CHAUSSURES;
            break;
          default:
            break;
        }
        delete mongoMarqueVetement.typeTaille;
        return mongoMarqueVetement;
      })
    })
    .then((result) => {
      return result.map((mongoMarqueVetement: any) => {
        return update(mongoMarqueVetement, mongoMarqueVetement._id.toString(), MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS)
      })
    })
    .catch(() => {
      return null;
    });
}