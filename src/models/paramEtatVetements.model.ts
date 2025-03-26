import paramGenericVetementsModel from './paramGenericVetements.model';

/**
 * Modèle représentant un état de vetements
 */
export default interface ParamEtatVetementsModel extends paramGenericVetementsModel {
  readonly tri       : number;
}