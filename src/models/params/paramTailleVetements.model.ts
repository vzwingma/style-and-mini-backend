import ParamGenericVetementsModel from './paramGenericVetementsChaussures.model';

/**
 * Modèle représentant une taille de vetements
 */
export default interface ParamTailleVetementsModel extends ParamGenericVetementsModel {

  readonly tri        : number;
}