import { ObjectId } from 'mongodb';
import DressingModel from './dressing.model';
import VetementCaracteristiquesModel from './vetementCaracteristique.model';
import { StatutVetementEnum } from '../constants/AppEnum';

/**
 * Modèle représentant un vetement
 */
export default interface VetementModel {
  readonly id         : string;
  readonly dressing   : DressingModel;
  readonly libelle    : string;

  readonly type       : VetementCaracteristiquesModel;
  readonly taille     : VetementCaracteristiquesModel;
  readonly usages     : VetementCaracteristiquesModel[];
  
  readonly couleurs?   : string[];
  readonly description?: string;
  readonly image?      : string;  

  readonly statut?     : StatutVetementEnum;
}


/**
 * Convertit un objet VetementModel en un objet compatible avec MongoDB.
 *
 * @param {VetementModel} vetement - L'objet VetementModel à convertir.
 * @returns {Object} Un objet formaté pour être stocké dans MongoDB.
 */
export function vetementModelToMongoModel(vetement : VetementModel) {
  return {
    _id: new ObjectId(vetement.id),
    dressing: {
      id: new ObjectId(vetement.dressing.id),
      libelle: vetement.dressing.libelle
    },
    libelle: vetement.libelle,
    type: {
      id: new ObjectId(vetement.type.id),
      libelle: vetement.type.libelle
    },
    taille: {
      id: new ObjectId(vetement.taille.id),
      libelle: vetement.taille.libelle
    },
    usages: vetement.usages.map(usage => {
      return {
        id: new ObjectId(usage.id),
        libelle: usage.libelle
      };
    }),
    couleurs: vetement.couleurs,
    image: vetement.image,
    description: vetement.description,
    statut: vetement.statut
  };
}


/**
 * Convertit un objet MongoDB Vetement en un objet VetementModel.
 *
 * @param mongoVetement - L'objet Vetement provenant de MongoDB.
 * @returns Un objet VetementModel avec les propriétés converties.
 */
export function mongoModelToVetementModel(mongoVetement: any): VetementModel {
  let vetement: VetementModel = {
    id         : mongoVetement._id.toString(),
    dressing   : mongoVetement.dressing,
    libelle    : mongoVetement.libelle,
    type       : mongoVetement.type,
    taille     : mongoVetement.taille,
    usages     : mongoVetement.usages,
    couleurs   : mongoVetement.couleurs,
    image      : mongoVetement.image,
    description: mongoVetement.description,
    statut     : mongoVetement.statut === StatutVetementEnum.ARCHIVE ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF
  };
  return vetement;
}