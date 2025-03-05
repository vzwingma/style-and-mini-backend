import express from 'express';
import multer from 'multer';
import path from 'path';
import { collections } from '../services/Mongodb.Service';
import { ObjectId, UUID } from 'mongodb';
import { mongoModelToDressingModel } from '../models/dressing.model';
import { saveVetement } from '../controllers/dressing.controller';
import VetementModel, { mongoModelToVetementModel, vetementModelToMongoModel } from '../models/vetements.model';
import { SERVICES_URL } from '../constants/APIconstants';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${new Date().toISOString().replace(/:/g, "-")}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed"));
    }
    file.filename = `${new Date().toISOString().replace(/:/g, "-")}.${path.extname(file.originalname)}`;
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
});

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
router.get(SERVICES_URL.SERVICE_DRESSING_BY_ID, upload.single('image'), async (req, res) => {
  console.log('Get Dressing by Id', req.params.idd);
  if (collections.dressing) {
    const oId = new ObjectId(req.params.idd);
    const dressingById = (await collections.dressing.find({ '_id': oId }).toArray())
      .map((mongoTypeVetement: any) => mongoModelToDressingModel(mongoTypeVetement))
      .at(0);
    res.status(200).json(dressingById);
  } else {
    res.status(500).send('La collection Dressing est introuvable');
  }
});


/**
 * ** VETEMENTS **
 */


/**
 * GET vetements du dressing
 */
router.get(SERVICES_URL.SERVICE_VETEMENTS, async (req, res) => {
  if (collections.vetements) {
    const listeVetements = (await collections.vetements.find({ 'dressing.id': new ObjectId(req.params.idd)}).toArray())
                          .map((mongoTypeVetement: any) => mongoModelToVetementModel(mongoTypeVetement));
    res.status(200).json(listeVetements);
  } else {
    res.status(500).send('La collection Vetements est introuvable');
  }
});

/**
 * POST (CREATE) vetements du dressing
 */
router.post(SERVICES_URL.SERVICE_VETEMENTS, async (req, res) => {
  saveOrUpdateVetement(req, res);
});


/**
 * POST (UPDATE) vetements du dressing
 */
router.post(SERVICES_URL.SERVICE_VETEMENTS_BY_ID, async (req, res) => {
  saveOrUpdateVetement(req, res);
});

/**
 * Enregistre ou met à jour un vêtement dans le dressing spécifié.
 *
 * @param req - L'objet de requête contenant les paramètres et le corps de la requête.
 * @param res - L'objet de réponse utilisé pour envoyer la réponse au client.
 *
 * @returns Une promesse qui se résout avec une réponse HTTP indiquant le succès ou l'échec de l'opération.
 *
 * @remarks
 * - Si l'opération réussit, une réponse HTTP 200 est envoyée avec un message 'OK'.
 * - Si l'opération échoue, une réponse HTTP 500 est envoyée avec un message d'erreur.
 */
async function saveOrUpdateVetement(req: any, res: any) {

  const vetement: VetementModel = req.body;
  console.log('Save or Update Vetement', vetement);
  const saveResult = await saveVetement(vetementModelToMongoModel(vetement), req.params.idv);
  if (saveResult) {
    console.log("Vêtement [", saveResult, "] ", (req.params.idv ? "modifié" : "ajouté")," dans le dressing [", req.params.idd, "]");
    res.status(200).json({ idVetement: saveResult });
  } else {
    res.status(500).send("L'enregistrement du vêtement a échoué");
  }
}


/**
 * POST (UPDATE) image/photo du vetements du dressing
 */
router.post(SERVICES_URL.SERVICE_PHOTO_VETEMENTS_BY_ID, upload.single('image'), (req, res) => {
  console.log('Update photo vetement by Id', req.params.idv, req.params.idp);
  const { body, file } = req;
  console.log({ body, file });
  res.json({
    message: '👗​ Styles and Mini 👚 - API',
  });
});

export default router;