import VetementImageModel from "../vetements/vetements.image.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface TenueVetementModel {
    readonly id         : string;
    readonly libelle    : string;    
    image?              : VetementImageModel | null;
}
export default TenueVetementModel;