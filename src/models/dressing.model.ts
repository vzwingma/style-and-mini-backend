import { CategorieDressingEnum } from "../constants/AppEnum";
import DressingVetementModel from "./vetements.model";

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
}