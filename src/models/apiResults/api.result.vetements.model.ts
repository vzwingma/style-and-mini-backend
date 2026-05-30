import VetementModel from '../vetements/vetements.model.js';
import APIResultFormGenericModel from './api.result.generic.model.js';

/**
 * Modèle représentant un vetement avec le backend
 */
interface APIResultFormVetementModel extends APIResultFormGenericModel {
  readonly vetement?  : VetementModel;
}
export default APIResultFormVetementModel;