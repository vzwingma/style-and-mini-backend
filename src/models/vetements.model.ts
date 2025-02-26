import { ObjectId } from 'mongodb';
import DressingModel from './dressing.model';
import VetementCaracteristiquesModel from './vetementCaracteristique.model';

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
  readonly couleurs   : string[];
  readonly image?     : string;
  readonly description: string;
}


/**
 * 
 * @param vetement 
 * @returns état de l'objet VetementModel au model Mongo
 */
export function vetementModelToMongoModel(vetement : VetementModel) {

  const mongoUsages = vetement.usages.map(usage => {
    return {
      id: new ObjectId(usage.id),
      libelle: usage.libelle
    };
  });

  return {
    _id: new ObjectId(vetement.id),
    dressing: new ObjectId(vetement.dressing.id),
    libelle: vetement.libelle,
    type: {
      id: new ObjectId(vetement.type.id),
      libelle: vetement.type.libelle
    },
    taille: {
      id: new ObjectId(vetement.taille.id),
      libelle: vetement.taille.libelle
    },
    usages: mongoUsages,
    couleurs: vetement.couleurs,
    image: vetement.image,
    description: vetement.description
  };
}