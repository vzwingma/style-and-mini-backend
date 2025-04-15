// Enumération des statuts de l'application

export enum StatutVetementEnum {
  ACTIF = "ACTIF",
  ARCHIVE = "ARCHIVE",
}


// Enumération des statuts de vêtements
export enum SaisonVetementEnum {
  ETE = "ETE",
  MISAISON = "MISAISON",
  HIVER = "HIVER",
}

// 
export enum CategorieDressingEnum {
  BEBE = "BEBE",
  ENFANT = "ENFANT",
  ADULTE = "ADULTE",
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
  CHAUSSURES = 'CHAUSSURES',
}



/**
 * Enumération représentant les différents paramètres liés aux vêtements.
 * 
 * - `TYPE` : Type de vêtement (exemple : chemise, pantalon, etc.).
 * - `TAILLES` : Tailles disponibles pour les vêtements.
 * - `MARQUES` : Marques associées aux vêtements.
 * - `USAGES` : Usages ou occasions pour lesquels les vêtements sont destinés.
 * - `ETATS` : États des vêtements (exemple : neuf, usagé, etc.).
 * - `DRESSING` : Référence au dressing ou à l'organisation des vêtements.
 */
export enum ParametragesVetementEnum {
  TYPES = 'TYPES',
  TAILLES = 'TAILLES',
  MARQUES = 'MARQUES',
  USAGES = 'USAGES',
  ETATS = 'ETATS',
  DRESSING = 'DRESSING'
}