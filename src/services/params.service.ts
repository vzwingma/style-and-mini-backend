import { MONGO_DB_COLLECTIONS } from "../constants/AppConstants";
import { ParametragesVetementEnum } from "../constants/AppEnum";
import { findInCollections } from "./Mongodb.Service";




/**
 * Génère une requête de jointure MongoDB pour associer une collection de vêtements
 * en fonction du type de paramètre spécifié.
 *
 * @param typeParam - Le type de paramètre de vêtement à utiliser pour la jointure.
 *                    Les valeurs possibles sont définies dans l'énumération `ParametragesVetementEnum`.
 *                    Par exemple : `TYPES`, `TAILLES`, `USAGES`, `ETATS`, `MARQUES`.
 * 
 * @returns Une collection MongoDB de type `MONGO_DB_COLLECTIONS` contenant la requête
 *          de jointure avec le nombre de vêtements associés, ou un objet vide si le type
 *          de paramètre n'est pas reconnu.
 *
 */
const getLookupJoinWithVetements = (typeParam: ParametragesVetementEnum): MONGO_DB_COLLECTIONS | {} => {
    let jointAttribute = null;
    let jointVetement = null;
    switch (typeParam) {
        case ParametragesVetementEnum.TYPES:
            jointAttribute = 'type.id';
            break;
        case ParametragesVetementEnum.TAILLES:
            jointAttribute = 'taille.id';
            break;
        case ParametragesVetementEnum.ETATS:
            jointAttribute = 'etat.id';
            break;
        case ParametragesVetementEnum.MARQUES:
            jointAttribute = 'marque.id';
            break;
        case ParametragesVetementEnum.USAGES:
            jointVetement = '$usages';
            break;
        default:
            break;
    }
    if (jointAttribute !== null) {
        /** Construction de la requete de jointure avec le nombre de vêtement */
        return [
            {
                $lookup: {
                    from: "vetements",
                    localField: "_id",
                    foreignField: jointAttribute,
                    as: "vetements",
                },
            },
            {
                $addFields:
                {
                    vetements: {
                        $size: "$vetements",
                    },
                },
            },
        ];
    }
    else if (jointVetement !== null) {
        return [
            {
              $unwind: {
                path: jointVetement,
                includeArrayIndex: "string",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $group: {
                _id: jointVetement+".id",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $lookup:
                {
                  from: "paramUsagesVetements",
                  localField: "_id",
                  foreignField: "_id",
                  as: "result",
                },
            },
            {
              $unwind:
                {
                  path: "$result",
                  includeArrayIndex: "string",
                  preserveNullAndEmptyArrays: true,
                },
            },
            {
              $project:
                {
                  _id: "$_id",
                  libelle: "$result.libelle",
                  categories: "$result.categories",
                  vetements: "$count",
                },
            },
          ]
    }
    else {
        return {}
    }
}


    /**
     * Récupère les paramètres des vêtements depuis une collection MongoDB.
     *
     * @param {MONGO_DB_COLLECTIONS} paramCollections - La collection MongoDB à partir de laquelle récupérer les paramètres.
     * @returns {Promise<any>} Une promesse qui se résout avec les résultats de la collection ou se rejette avec une erreur.
     */
    export function loadParametrages(paramCollections: MONGO_DB_COLLECTIONS, typeParams: ParametragesVetementEnum): Promise<any> {

        const lookupVetement = getLookupJoinWithVetements(typeParams);

        /** Hook pour le chargement des nbs de vêtements associés - réalisé via Vêtements */
        if(typeParams === ParametragesVetementEnum.USAGES) {
            paramCollections = MONGO_DB_COLLECTIONS.VETEMENTS;
        }

        return findInCollections(paramCollections, lookupVetement)
            .then((result) => {
                console.log('Résultat de la recherche dans la collection', paramCollections, result);
                return result
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération depuis' + paramCollections, err);
                return new Error('Erreur lors de la récupération depuis' + paramCollections + err);
            });
    }
