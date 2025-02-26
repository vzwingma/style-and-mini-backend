import { ObjectId } from "mongodb";
import { collections } from "../services/Mongodb.Service";


/**
 * Save a vetement
 * @param dressingById 
 * @param vetement 
 * @param vetementId 
 * @returns 
 */
export function saveVetement(dressingById : string, vetement: any, vetementId? : string): boolean {
    if (collections.vetements) {
        console.log('Save Vetement', dressingById, vetement, vetementId);
        
        if (vetementId) {
            collections.vetements.updateOne({ '_id': new ObjectId(vetementId) }, { $set: { ...vetement } });
            return true;
        } else {
            collections.vetements.insertOne({ ...vetement, dressing: dressingById });
            return true;
        }

    }
    return false;
}
