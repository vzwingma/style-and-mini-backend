/**
 * Modèle représentant une tenue avec le backend
 */
interface APIResultFormGenericModel {
    readonly id         : string;
    readonly deleted?   : boolean;
    readonly created?   : boolean;
    readonly updated?   : boolean;
}
export default APIResultFormGenericModel;