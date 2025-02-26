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
export function saveVetement(dressingById: string, vetement: any, vetementId?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (collections.vetements) {
            console.log('Save Vetement', dressingById, vetement, vetementId);

            if (vetementId) {
                collections.vetements.updateOne({ '_id': new ObjectId(vetementId) }, { $set: { ...vetement } })
                    .then(() => {
                        resolve(true);
                    })
                    .catch((e) => {
                        console.error("Erreur lors de l'enregistrement du vêtement", e);
                        reject(false);
                    });
            } else {
                collections.vetements.insertOne({ ...vetement })
                    .then(() => {
                        resolve(true);
                    })
                    .catch((e) => {
                        console.error("Erreur lors de l'enregistrement du vêtement", e);
                        reject(false);
                    });
            }
        } else {
            reject(false);
        }
    });
}
