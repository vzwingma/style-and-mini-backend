import express from 'express';
import { collections } from '../services/Mongodb.Service';
import { ObjectId } from 'mongodb';
import DressingModel from '../models/dressing.model';

const router = express.Router();


/**
 * ROOT URL : '/dressing'
 */

/**
 * Get all dressings
 */
router.get("/", async (req, res) => {

  if (collections.dressing) {
    const listeDressings = (await collections.dressing.find({}).toArray())
      .map((mongoTypeVetement: any, index: number) => {
        let dressing: DressingModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categorie: mongoTypeVetement.categorie,
          vetements: mongoTypeVetement.vetements
        };
        return dressing;
      });
      console.log("Get all Dressings", listeDressings);
    res.status(200).json(listeDressings);
  } else {
    res.status(500).send("La collection Dressing est introuvable");
  }
});

/**
 * Get dressing by id
 */
router.get("/:id", async (req, res) => {
  console.log("Get Dressing by Id", req.params.id);
  if (collections.dressing) {
    const oId = new ObjectId(req.params.id);
    const dressingById = (await collections.dressing.find({ '_id': oId }).toArray())
      .map((mongoTypeVetement: any, index: number) => {
        let dressing: DressingModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categorie: mongoTypeVetement.categorie,
          vetements: mongoTypeVetement.vetements
        };
        return dressing;
      })
      .at(0);
    res.status(200).json(dressingById);
  } else {
    res.status(500).send("La collection Dressing est introuvable");
  }
});

export default router;