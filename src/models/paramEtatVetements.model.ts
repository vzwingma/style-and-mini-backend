import { CategorieDressingEnum } from '../constants/AppEnum';

/**
 * Modèle représentant un état de vetements
 */
export default interface ParamEtatVetementsModel {
  readonly id         : string;
  readonly libelle    : string;
  readonly categories : CategorieDressingEnum[];
}