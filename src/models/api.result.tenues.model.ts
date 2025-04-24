import VetementModel from "./vetements/vetements.model";

/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormTenueModel {
    readonly id         : string;
    readonly tenue?     : VetementModel;
    readonly deleted?   : boolean;
    readonly created?   : boolean;
    readonly updated?   : boolean;
}
export default APIResultFormTenueModel;