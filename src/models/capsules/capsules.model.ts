import { ObjectId } from 'mongodb';
import DressingModel from '../dressing.model';

/**
 * Modèle représentant un vetement
 */
export default interface CapsuleModel {
  id                    : string;
  readonly libelle      : string;
  readonly dressing     : DressingModel;
  criteres              : string[] | [];
  nbrVetements          : {
    capsule    : number | 0
  };
  commentaire?         : string;
}


/**
 * Convertit un objet CapsuleModel en un modèle compatible avec MongoDB.
 *
 * @param capsule - L'objet CapsuleModel à convertir.
 * @returns Un objet formaté pour MongoDB représentant la capsule.
 */
export function capsuleModelToMongoModel(capsule : CapsuleModel) {

  const mongoCapsule = {
    _id: new ObjectId(capsule.id),
    dressing: {
      id: new ObjectId(capsule.dressing.id),
      libelle: capsule.dressing.libelle,
    },
    criteres    : capsule.criteres,
    libelle     : capsule.libelle,
    nbVetements : capsule.nbrVetements.capsule,
    commentaire : capsule.commentaire
  };
  return mongoCapsule;
}


/**
 * Convertit un objet MongoDB représentant un vêtement en un modèle de capsule.
 *
 * @param mongoVetement - L'objet MongoDB représentant un vêtement.
 * @returns Un objet `CapsuleModel` contenant les informations converties.
 */
export function mongoModelToCapsuleModel(mongoVetement: any): CapsuleModel {
  let capsule: CapsuleModel = {
    id          : mongoVetement._id.toString(),
    dressing    : mongoVetement.dressing,
    libelle     : mongoVetement.libelle,
    criteres    : mongoVetement.criteres,
    nbrVetements : {
      capsule : mongoVetement.nbVetements
    },
    commentaire : mongoVetement.commentaire
  }
  return capsule;
}
