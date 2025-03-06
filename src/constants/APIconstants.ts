/**
 * L'URL de l'API.
 */


export enum API_VERBS {
    GET     = "GET",
    POST    = "POST",
    PUT     = "PUT",
    DELETE  = "DELETE"
}

/**
 * Paramètres pour les services.
 */
export const enum SERVICES_PARAMS {
    ID_DRESSING         = ":idd",
    ID_VETEMENT         = ":idv",
    ID_PHOTO            = ":idp"
}


/**
 * URLs pour différents services.
 */
export enum SERVICES_URL {
    SERVICE_CONFIG = "/status",
    SERVICE_PARAMS = "/params/vetements",
    SERVICE_PARAMS_TYPE_VETEMENTS   = "/types",
    SERVICE_PARAMS_TAILLES_MESURES  = "/taillesMesures",
    SERVICE_PARAMS_USAGES           = "/usages",
    SERVICE_PARAMS_ETATS            = "/etats",

    SERVICE_DRESSINGS       = "/dressing",
    SERVICE_DRESSING_BY_ID  = "/"+SERVICES_PARAMS.ID_DRESSING,
    SERVICE_VETEMENTS       = SERVICE_DRESSING_BY_ID+"/vetements",
    SERVICE_VETEMENTS_BY_ID = SERVICE_VETEMENTS+"/"+SERVICES_PARAMS.ID_VETEMENT
}


/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
    key: SERVICES_PARAMS;
    value: string;
}
