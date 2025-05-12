import { ObjectId } from 'mongodb';
import DressingModel from '../dressing.model';
import { StatutVetementEnum } from '../../constants/AppEnum';
import TenueVetementModel from './tenue.vetements.model';
import VetementImageModel from '../vetements/vetements.image.model';

/**
 * Modèle représentant un vetement
 */
export default interface TenueModel {
  id                   : string;
  readonly libelle     : string;
  readonly dressing    : DressingModel;
  readonly vetements?  : TenueVetementModel[] | null;
  readonly statut?     : StatutVetementEnum;
  readonly image?      : VetementImageModel | null;
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
    vetements: tenue.vetements,
    libelle: tenue.libelle,
    statut: tenue.statut,
    image: tenue.image,
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
    vetements  : mongoVetement.vetements,
    statut     : mongoVetement.statut === StatutVetementEnum.ARCHIVE ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF,
    image      : mongoVetement.image
  };
  return tenue;
}
