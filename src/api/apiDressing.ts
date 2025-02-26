import express from 'express';
import { collections } from '../services/Mongodb.Service';
import { ObjectId } from 'mongodb';
import { mongoModelToDressingModel } from '../models/dressing.model';
import { saveVetement } from '../controllers/dressing.controller';
import VetementModel, { mongoModelToVetementModel, vetementModelToMongoModel } from '../models/vetements.model';

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
  const vetement: VetementModel = req.body;

  const result = await saveVetement(req.params.idD, vetementModelToMongoModel(vetement));
  if (result) {
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
  const vetement: VetementModel = req.body;

  const saveResult = await saveVetement(req.params.idD, vetementModelToMongoModel(vetement), req.params.idV);
  if (saveResult) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(500).send("L'enregistrement du vêtement a échoué");
  }
});




/**
 * GET vetements du dressing
 */
router.get('/:idD/vetements', async (req, res) => {
  if (collections.vetements) {
    const listeVetements = (await collections.vetements.find({ 'dressing.id': new ObjectId(req.params.idD)}).toArray())
                          .map((mongoTypeVetement: any) => mongoModelToVetementModel(mongoTypeVetement));
    res.status(200).json(listeVetements);
  } else {
    res.status(500).send('La collection Vetements est introuvable');
  }
});

export default router;