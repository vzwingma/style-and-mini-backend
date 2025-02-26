import { CategorieDressingEnum } from '../constants/AppEnum';

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
  readonly id         : string;
  readonly libelle    : string;
  readonly categorie  : CategorieDressingEnum;
}


export function mongoModelToDressingModel(mongoDressing: any): DressingModel {
  let dressing: DressingModel = {
    id        : mongoDressing._id.toString(),
    libelle   : mongoDressing.libelle,
    categorie : mongoDressing.categorie,
  };
  return dressing;
}