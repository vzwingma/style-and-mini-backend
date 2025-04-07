/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
export default interface VetementImageModel {
    readonly s3uri        : string;
    readonly hauteur      : number;
    readonly largeur      : number;
}