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
  UNAUTHORIZED     = 401,
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
  ID_PHOTO            = ':idp',
}


/**
 * URLs pour différents services.
 */
export enum ServiceURLEnum {
  SERVICE_CONFIG = '/status',
  SERVICE_PARAMS = '/params/vetements',
  SERVICE_PARAMS_TYPE_VETEMENTS   = '/types',
  SERVICE_PARAMS_TAILLES_MESURES  = '/taillesMesures',
  SERVICE_PARAMS_USAGES           = '/usages',
  SERVICE_PARAMS_MARQUES          = '/marques',
  SERVICE_PARAMS_ETATS            = '/etats',

  SERVICE_DRESSINGS       = '/dressing',
  SERVICE_DRESSING_BY_ID  = '/' + ServicesParamsEnum.ID_DRESSING,
  SERVICE_VETEMENTS       = SERVICE_DRESSING_BY_ID + '/vetements',
  SERVICE_VETEMENTS_BY_ID = SERVICE_VETEMENTS + '/' + ServicesParamsEnum.ID_VETEMENT,
}


/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
  key: ServicesParamsEnum;
  value: string;
}
