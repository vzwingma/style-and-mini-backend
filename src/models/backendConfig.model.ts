/**
 * Modèle représentant la configuration du backend.
 */

export default interface BackendConfigModel {
  readonly status: string;
  readonly version?: string;
  readonly env?: string;
}