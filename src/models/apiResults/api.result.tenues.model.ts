import VetementModel from "../vetements/vetements.model";
import APIResultFormGenericModel from "./api.result.generic.model";

/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormTenueModel extends APIResultFormGenericModel{
    readonly tenue?     : VetementModel;
}
export default APIResultFormTenueModel;