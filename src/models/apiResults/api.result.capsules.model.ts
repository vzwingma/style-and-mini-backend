import CapsuleModel from "../capsules/capsules.model";
import APIResultFormGenericModel from "./api.result.generic.model";

/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormCapsuleModel extends APIResultFormGenericModel{
    readonly capsule?     : CapsuleModel;
}
export default APIResultFormCapsuleModel;