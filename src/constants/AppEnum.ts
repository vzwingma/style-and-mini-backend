
export const APP_MOBILE_VERSION = '0.2.0';
export const APP_MOBILE_NAME = 'Style et Mini';
// Enumération des statuts de l'application

export enum StatutVetementEnum {
  ACTIF   = 'ACTIF',
  ARCHIVE = 'ARCHIVE',
}


// Enumération des statuts de vêtements
export enum SaisonVetementEnum {
  ETE = 'ETE', MISAISON = 'MISAISON', HIVER = 'HIVER'
}

// 
export enum CategorieDressingEnum {
  BEBE    = 'BEBE',
  ENFANT  = 'ENFANT',
  ADULTE  = 'ADULTE',
}

/**
 * Enumération représentant les différents types de tailles disponibles.
 * 
 * @enum {string}
 * @property {string} VETEMENTS - Taille pour les vêtements.
 * @property {string} CHAUSSURES - Taille spécifique aux chaussures.
 */
export enum TypeTailleEnum {
  VETEMENTS = 'VETEMENTS',
  CHAUSSURES = 'CHAUSSURES'
}