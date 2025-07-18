import { ObjectId } from 'mongodb';
import { CategorieDressingEnum, ParametragesVetementEnum, TypeTailleEnum } from '../../constants/AppEnum';

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamGenericVetementsModel {
  readonly id: string;
  readonly libelle: string;
  readonly categories: CategorieDressingEnum[];
  readonly types?: TypeTailleEnum[];
  readonly tri?: number;
  readonly nombreVetements?: number;
}




/**
 * Convertit un objet VetementModel en un objet compatible avec MongoDB.
 *
 * @param {VetementModel} parametrage - L'objet VetementModel à convertir.
 * @returns {Object} Un objet formaté pour être stocké dans MongoDB.
 */
export function transformParametrageModelToMongoModel(typeParametrage: ParametragesVetementEnum, parametrage: ParamGenericVetementsModel) {
  // recopie des éléments communs
  let mongoVetement = {
    _id: new ObjectId(parametrage.id),
    libelle: parametrage.libelle,
    categories: parametrage.categories,
  } as any;

  // Complétion des éléments spécifiques au type de paramétrage
  switch (typeParametrage) {
    case ParametragesVetementEnum.TAILLES:
      mongoVetement = { ...mongoVetement, types: parametrage.types, tri: parametrage.tri };
      break;
    case ParametragesVetementEnum.TYPES:
    case ParametragesVetementEnum.MARQUES:
      mongoVetement = { ...mongoVetement, types: parametrage.types };
      break;
    case ParametragesVetementEnum.ETATS:
      mongoVetement = { ...mongoVetement, tri: parametrage.tri };
      break;
    default:
      break;
  }
  return mongoVetement;
}


export function transformCategoriesVetementToMongoModel(mongoParametrage : any) {
  // Si le champ legacy categorie est défini, on le traite comme un tableau de catégories
  // sinon on utilise le champ categories qui est un tableau de catégories
  if(mongoParametrage.categories !== undefined && mongoParametrage.categories !== null){
    return mongoParametrage.categories;
  }
  if(mongoParametrage.categorie !== undefined && mongoParametrage.categorie !== null){
    return (typeof mongoParametrage.categorie === 'string' ? [mongoParametrage.categorie] : mongoParametrage.categorie) 
  } 
  return mongoParametrage.categories;
}

/**
 * Convertit un objet MongoDB Vetement en un objet VetementModel.
 *
 * @param mongoParametrage - L'objet Vetement provenant de MongoDB.
 * @returns Un objet VetementModel avec les propriétés converties.
 */
export function transformMongoModelToParametrageModel(typeParametrage: ParametragesVetementEnum, mongoParametrage: any): ParamGenericVetementsModel {
  let parametrage: ParamGenericVetementsModel = {
    id: mongoParametrage._id.toString(),
    libelle: mongoParametrage.libelle,
    categories: transformCategoriesVetementToMongoModel(mongoParametrage),
    nombreVetements: mongoParametrage.vetements,
  };

  // Complétion des éléments spécifiques au type de paramétrage
  switch (typeParametrage) {
    case ParametragesVetementEnum.TAILLES:
      parametrage = { ...parametrage, types: mongoParametrage.types ? mongoParametrage.types : [mongoParametrage.type], tri: mongoParametrage.tri };
      break;
    case ParametragesVetementEnum.TYPES:
    case ParametragesVetementEnum.MARQUES:
      parametrage = { ...parametrage, types: mongoParametrage.types ? mongoParametrage.types : [mongoParametrage.type] };
      break;
    case ParametragesVetementEnum.ETATS:
      parametrage = { ...parametrage, tri: mongoParametrage.tri };
      break;
    default:
      break;
  }
  return parametrage;
}



export default ParamGenericVetementsModel;