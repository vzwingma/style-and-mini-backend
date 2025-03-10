import { findInCollection } from '../services/Mongodb.Service';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';





export function getParamsEtatVetements(paramCollections : MONGO_DB_COLLECTIONS): Promise<any> {
  return new Promise((resolve, reject) => {
    findInCollection(paramCollections, { })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération depuis' + paramCollections, err);
        reject(null);
      });
  });
}
