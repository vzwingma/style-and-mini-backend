import { ObjectId } from "mongodb";
import { collections } from "../services/Mongodb.Service";



/**
 * Enregistre un vêtement dans la collection des vêtements.
 *
 * @param dressingById - L'identifiant du dressing auquel le vêtement appartient.
 * @param vetement - Les détails du vêtement à enregistrer.
 * @param vetementId - (Optionnel) L'identifiant du vêtement à mettre à jour. Si non fourni, un nouveau vêtement sera inséré.
 * @returns Une promesse qui se résout à `true` si l'enregistrement est réussi, ou se rejette avec `false` en cas d'erreur.
 */
export function saveVetement(vetement: any, vetementId?: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        if (collections.vetements) {
            console.log('[MongoDB] Save Vetement', vetement);

            if (vetementId) {
                collections.vetements.updateOne({ '_id': new ObjectId(vetementId) }, { $set: { ...vetement } })
                    .then(() => {
                        resolve(vetementId);
                    })
                    .catch((e) => {
                        console.error("[MongoDB] Erreur lors de l'enregistrement du vêtement", e);
                        reject(null);
                    });
            } else {
                collections.vetements.insertOne({ ...vetement })
                    .then((result) => {
                        resolve(result.insertedId.toString());
                    })
                    .catch((e) => {
                        console.error("[MongoDB] Erreur lors de l'enregistrement du vêtement", e);
                        reject(null);
                    });
            }
        } else {
            reject(null);
        }
    });
}
