import VetementModel from "./vetements.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface APIResultVetementModel {
    readonly idVetement : string;
    readonly vetement?  : VetementModel;
    readonly deleted?   : boolean;
    readonly created?   : boolean;
    readonly updated?   : boolean;
}
export default APIResultVetementModel;