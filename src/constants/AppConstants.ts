import dotenv from 'dotenv'; 

dotenv.config();

export const APP_MOBILE_VERSION = process.env.VERSION ?? "1.1.2";
export const BACKEND_PORT = process.env.PORT ?? 3000;

/**
 * Configuration MongoDB
 */
export const MONGO_DB_URI = process.env.MONGO_DB_URI ?? '';
export const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE ?? 'style-mini-app-dev';

export enum MONGO_DB_COLLECTIONS {
  PARAM_TYPES_VETEMENTS   = 'paramTypeVetements',
  PARAM_TAILLES_MESURES   = 'paramTaillesMesures',
  PARAM_USAGES_VETEMENTS  = 'paramUsagesVetements',
  PARAM_ETATS_VETEMENTS   = 'paramEtatsVetements', 
  PARAM_MARQUES_VETEMENTS = 'paramMarquesVetements',
  
  DRESSING                = 'dressing',
  VETEMENTS               = 'vetements',
  TENUES                  = 'tenues',
  CAPSULES                = 'capsules'
};