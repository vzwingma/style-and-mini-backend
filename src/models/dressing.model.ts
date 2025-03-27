import { CategorieDressingEnum } from '../constants/AppEnum';

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
  readonly id         : string;
  readonly libelle    : string;
  readonly categorie  : CategorieDressingEnum;
}


/**
 * Convertit un objet MongoDB représentant un dressing en un modèle de dressing.
 *
 * @param mongoDressing - L'objet MongoDB contenant les données du dressing.
 * @returns Un objet `DressingModel` contenant les données converties.
 */
export function mongoModelToDressingModel(mongoDressing: any): DressingModel {
  let dressing: DressingModel = {
    id        : mongoDressing._id.toString(),
    libelle   : mongoDressing.libelle,
    categorie : mongoDressing.categorie,
  };
  return dressing;
}