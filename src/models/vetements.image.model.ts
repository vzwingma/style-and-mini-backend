/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
export default interface VetementImageModel {
    readonly id           : string;
    readonly contenu      : string;
    readonly hauteur      : number;
    readonly largeur      : number;
}