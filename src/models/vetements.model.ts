import DressingModel from "./dressing.model";
import VetementCaracteristiquesModel from "./vetementCaracteristique.model";

/**
 * Modèle représentant un vetement
 */
export default interface VetementModel {
    readonly id         : string;
    readonly dressing   : DressingModel;
    readonly libelle    : string;
    readonly type       : VetementCaracteristiquesModel;
    readonly taille     : VetementCaracteristiquesModel;
    readonly usages     : VetementCaracteristiquesModel[];
    readonly couleurs   : string[];
    readonly image?     : string;
    readonly description: string;
}