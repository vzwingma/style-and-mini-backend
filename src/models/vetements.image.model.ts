/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
export default interface VetementImageModel {
    readonly id           : string;
    readonly nom          : string;
    readonly hauteur      : number;
    readonly largeur      : number;
}