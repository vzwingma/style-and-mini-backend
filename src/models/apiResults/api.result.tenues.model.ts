import VetementModel from '../vetements/vetements.model.js';
import APIResultFormGenericModel from './api.result.generic.model.js';

/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormTenueModel extends APIResultFormGenericModel {
  readonly tenue?     : VetementModel;
}
export default APIResultFormTenueModel;