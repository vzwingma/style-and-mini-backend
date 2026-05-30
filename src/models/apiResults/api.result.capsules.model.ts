import CapsuleModel from '../capsules/capsules.model.js';
import APIResultFormGenericModel from './api.result.generic.model.js';

/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormCapsuleModel extends APIResultFormGenericModel {
  readonly capsule?     : CapsuleModel;
}
export default APIResultFormCapsuleModel;