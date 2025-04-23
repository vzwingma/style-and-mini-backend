import { ObjectId } from 'mongodb';
import DressingModel from '../dressing.model';
import { StatutVetementEnum } from '../../constants/AppEnum';

/**
 * Modèle représentant un vetement
 */
export default interface TenueModel {
  id                   : string;
  readonly dressing    : DressingModel;
  readonly libelle     : string;
  
  readonly statut?     : StatutVetementEnum;
}


/**
 * Convertit un objet TenueModel en un objet compatible avec MongoDB.
 *
 * @param {TenueModel} tenue - L'objet TenueModel à convertir.
 * @returns {Object} Un objet formaté pour être stocké dans MongoDB.
 */
export function tenueModelToMongoModel(tenue : TenueModel) {

  const mongoTenue = {
    _id: new ObjectId(tenue.id),
    dressing: {
      id: new ObjectId(tenue.dressing.id),
      libelle: tenue.dressing.libelle,
    },
    libelle: tenue.libelle,
    statut: tenue.statut,
  };
  return mongoTenue;
}


/**
 * Convertit un objet MongoDB Vetement en un objet TenueModel.
 *
 * @param mongoVetement - L'objet Vetement provenant de MongoDB.
 * @returns Un objet VetementModel avec les propriétés converties.
 */
export function mongoModelToTenueModel(mongoVetement: any): TenueModel {
  let tenue: TenueModel = {
    id         : mongoVetement._id.toString(),
    dressing   : mongoVetement.dressing,
    libelle    : mongoVetement.libelle,
    statut     : mongoVetement.statut === StatutVetementEnum.ARCHIVE ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF,
  };
  return tenue;
}
