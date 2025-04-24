import VetementModel from "./vetements/vetements.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface APIResultFormVetementModel {
    readonly id : string;
    readonly vetement?  : VetementModel;
    readonly deleted?   : boolean;
    readonly created?   : boolean;
    readonly updated?   : boolean;
}
export default APIResultFormVetementModel;