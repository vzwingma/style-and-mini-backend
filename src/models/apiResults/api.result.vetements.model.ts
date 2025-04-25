import VetementModel from "../vetements/vetements.model";
import APIResultFormGenericModel from "./api.result.generic.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface APIResultFormVetementModel extends APIResultFormGenericModel {
    readonly vetement?  : VetementModel;
}
export default APIResultFormVetementModel;