import ParamGenericVetementsModel from "./paramGenericVetements.model";

/**
 * Modèle représentant un état de vetements
 */
export default interface ParamEtatVetementsModel extends ParamGenericVetementsModel {
  readonly tri       : number;
}