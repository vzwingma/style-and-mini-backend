import { CategorieDressingEnum, TypeTailleEnum } from '../constants/AppEnum';
import paramGenericVetementsModel from './paramGenericVetements.model';

/**
 * Modèle représentant un type de vetements
 */
export default interface ParamTypeVetementsModel extends paramGenericVetementsModel {

  readonly typeTaille     : TypeTailleEnum
}