/**
 * L'URL de l'API.
 */


export enum ApiVerbsEnum {
  GET     = 'GET',
  POST    = 'POST',
  PUT     = 'PUT',
  DELETE  = 'DELETE',
}

export enum ApiHTTPStatusEnum {
  OK              = 200,
  CREATED         = 201,
  BAD_REQUEST     = 400,
  UNAUTHORIZED    = 401,
  FORBIDDEN       = 403,
  NOT_FOUND       = 404,
  INTERNAL_ERROR  = 500,
}

/**
 * Paramètres pour les services.
 */
export const enum ServicesParamsEnum {
  ID_DRESSING         = ':idd',
  ID_VETEMENT         = ':idv',
  ID_TENUE            = ':idt',
  ID_CAPSULE          = ':idc',
  ID_PARAM            = ':idp',
  TYPE_PARAM          = ':type',
}


  export const SERVICE_ACTION_COUNT = "?count"

/**
 * Enumération des URLs des services.
 *
 * Chaque entrée représente une URL spécifique pour un service donné.
 * Ces URLs sont utilisées pour accéder aux différentes fonctionnalités
 * de l'API, telles que la configuration, les paramètres, les dressings,
 * les vêtements, les tenues et les capsules.
 */
export enum ServiceURLEnum {
  SERVICE_CONFIG = '/status',

  SERVICE_PARAMS = '/params/vetements',
  SERVICE_PARAMS_BY_TYPE          = '/' + ServicesParamsEnum.TYPE_PARAM,
  SERVICE_PARAMS_BY_TYPE_AND_ID   = SERVICE_PARAMS_BY_TYPE + '/' + ServicesParamsEnum.ID_PARAM,
  SERVICE_PARAMS_TYPE_VETEMENTS   = '/types',
  SERVICE_PARAMS_TAILLES_MESURES  = '/taillesMesures',
  SERVICE_PARAMS_USAGES           = '/usages',
  SERVICE_PARAMS_MARQUES          = '/marques',
  SERVICE_PARAMS_ETATS            = '/etats',

  SERVICE_DRESSINGS       = '/dressing',
  SERVICE_DRESSING_BY_ID  = '/' + ServicesParamsEnum.ID_DRESSING,

  SERVICE_VETEMENTS       = SERVICE_DRESSING_BY_ID + '/vetements',
  SERVICE_VETEMENTS_BY_ID = SERVICE_VETEMENTS + '/' + ServicesParamsEnum.ID_VETEMENT,
  SERVICE_VETEMENTS_IMAGE = SERVICE_VETEMENTS_BY_ID+"/image",

  SERVICE_TENUES          = SERVICE_DRESSING_BY_ID+"/tenues",
  SERVICE_TENUES_BY_ID    = SERVICE_TENUES +"/"+ServicesParamsEnum.ID_TENUE,

  SERVICE_CAPSULES          = SERVICE_DRESSING_BY_ID+"/capsules",
  SERVICE_CAPSULES_BY_ID    = SERVICE_CAPSULES +"/"+ServicesParamsEnum.ID_CAPSULE,
}


/**
 * Interface représentant une paire clé-valeur pour les paramètres des URL.
 *
 * @property {ServicesParamsEnum} key - La clé du paramètre, qui est une énumération de type ServicesParamsEnum.
 * @property {string} value - La valeur associée à la clé du paramètre.
 */
export interface KeyValueParams {
  key: ServicesParamsEnum;
  value: string;
}
