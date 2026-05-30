import TenueImageModel from './tenue.image.model.js';

/**
 * Modèle représentant un vetement avec le backend
 */
interface TenueVetementModel {
  readonly id         : string;
  readonly libelle    : string;    
  image?              : TenueImageModel | null;
}
export default TenueVetementModel;