import dotenv from 'dotenv'; 

dotenv.config();

export const BACKEND_PORT = process.env.PORT || 3000;

/**
 * Configuration MongoDB
 */
export const MONGO_DB_URI = process.env.MONGO_DB_URI || '';
export const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE || 'style-mini-app-dev';

export const MONGO_DB_COLLECTIONS = {
  PARAM_TYPES_VETEMENTS: 'paramTypeVetements',
  PARAM_TAILLES_MESURES: 'paramTaillesMesures',
  PARAM_USAGES_VETEMENTS: 'paramUsagesVetements',
  DRESSING: 'dressing',
  VETEMENTS: 'vetements',
};