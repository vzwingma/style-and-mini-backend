import { ObjectId } from 'mongodb';
import DressingModel from './dressing.model';
import VetementCaracteristiquesModel from './vetementCaracteristique.model';
import { SaisonVetementEnum, StatutVetementEnum } from '../constants/AppEnum';
import VetementImageModel from './vetements.image.model';
import VetementPrixModel from './vetements.prix.model';

/**
 * Modèle représentant un vetement
 */
export default interface VetementModel {
  readonly id          : string;
  readonly dressing    : DressingModel;
  readonly libelle     : string;

  readonly image?      : VetementImageModel;  

  readonly type        : VetementCaracteristiquesModel;
  readonly taille      : VetementCaracteristiquesModel;
  readonly usages      : VetementCaracteristiquesModel[];
  readonly saisons     : SaisonVetementEnum[];
  readonly couleurs?   : string;

  readonly etat?       : VetementCaracteristiquesModel;
  readonly marque?     : VetementCaracteristiquesModel;
  readonly collection? : string;

  readonly prix?       : VetementPrixModel;
  readonly description?: string;
  
  readonly statut?     : StatutVetementEnum;
}


/**
 * Convertit un objet VetementModel en un objet compatible avec MongoDB.
 *
 * @param {VetementModel} vetement - L'objet VetementModel à convertir.
 * @returns {Object} Un objet formaté pour être stocké dans MongoDB.
 */
export function vetementModelToMongoModel(vetement : VetementModel) {

  console.log('vetementModel' + vetement);
  const v = JSON.parse(JSON.stringify(vetement));
  console.log('vetementModel' + v);

  const mongoVetement = {
    _id: new ObjectId(vetement.id),
    dressing: {
      id: new ObjectId(vetement.dressing.id),
      libelle: vetement.dressing.libelle,
    },
    libelle: vetement.libelle,
    type: {
      id: new ObjectId(vetement.type.id),
      libelle: vetement.type.libelle,
    },
    taille: {
      id: new ObjectId(vetement.taille.id),
      libelle: vetement.taille.libelle,
      petite : vetement.taille.petite ? vetement.taille.petite : null,
    },
    usages: vetement.usages.map(usage => {
      return {
        id: new ObjectId(usage.id),
        libelle: usage.libelle,
      };
    }),
    saisons: vetement.saisons,
    etat: vetement.etat ? {
      id: new ObjectId(vetement.etat.id),
      libelle: vetement.etat.libelle,
    } : null,
    couleurs: vetement.couleurs,
    image: vetement.image ? {
      id      : vetement.image.id,
      contenu : vetement.image.contenu,
      hauteur : vetement.image.hauteur,
      largeur : vetement.image.largeur,
    } : null,
    marque: vetement.marque ? {
      id: new ObjectId(vetement.marque.id),
      libelle: vetement.marque.libelle,
    } : null,
    collection: vetement.collection,
    prix: vetement.prix ? {
      achat: vetement.prix.achat,
      neuf : vetement.prix.neuf,
    } : null,
    description: vetement.description,
    statut: vetement.statut,
  };

  console.log('ToMongoModel : '+mongoVetement);
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
    image      : mongoVetement.image,
    type       : mongoVetement.type,
    taille     : mongoVetement.taille,
    usages     : mongoVetement.usages,
    saisons    : mongoVetement.saisons,
    couleurs   : mongoVetement.couleurs,

    etat       : mongoVetement.etat,
    marque     : mongoVetement.marque,
    collection : mongoVetement.collection,
    prix       : mongoVetement.prix,
    description: mongoVetement.description,
    
    statut     : mongoVetement.statut === StatutVetementEnum.ARCHIVE ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF,
  };
  return vetement;
}
