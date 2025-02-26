import express from 'express';
import { collections } from '../services/Mongodb.Service';
import { ObjectId } from 'mongodb';
import { mongoModelToDressingModel } from '../models/dressing.model';
import { saveVetement } from '../controllers/dressing.controller';
import VetementModel, { vetementModelToMongoModel } from '../models/vetements.model';

const router = express.Router();

/**
 * ROOT URL : '/dressing'
 */

/**
 * Get all dressings
 */
router.get('/', async (req, res) => {

  if (collections.dressing) {
    const listeDressings = (await collections.dressing.find({}).toArray())
      .map((mongoTypeVetement: any) => mongoModelToDressingModel(mongoTypeVetement));

    res.status(200).json(listeDressings);
  } else {
    res.status(500).send('La collection Dressing est introuvable');
  }
});

/**
 * Get dressing by id
 */
router.get('/:id', async (req, res) => {
  console.log('Get Dressing by Id', req.params.id);
  if (collections.dressing) {
    const oId = new ObjectId(req.params.id);
    const dressingById = (await collections.dressing.find({ '_id': oId }).toArray())
      .map((mongoTypeVetement: any) => mongoModelToDressingModel(mongoTypeVetement))
      .at(0);
    res.status(200).json(dressingById);
  } else {
    res.status(500).send('La collection Dressing est introuvable');
  }
});



/**
 * POST (CREATE) vetements du dressing
 */
router.post('/:idD/vetements', async (req, res) => {
  console.log("Ajout d'un vêtements dans le dressing", req.params.idD);
  const vetement : VetementModel = req.body;
  if (saveVetement(req.params.idD, vetementModelToMongoModel(vetement))) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(500).send("L'enregistrement du vêtement a échoué");
  }
});


/**
 * POST (UPDATE) vetements du dressing
 */
router.post('/:idD/vetements/:idV', async (req, res) => {
  console.log("Modification d'un vêtement", req.params.idV, ' de dressing');
  if (saveVetement(req.params.idD, req.body, req.params.idV)) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(500).send("L'enregistrement du vêtement a échoué");
  }
});

export default router;