import express from 'express';
import { deleteVetement, getDressingById, getDressings, getImages, getVetements, saveVetement, updateImageVetement, updateVetement } from '../controllers/dressing.controller';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import VetementModel from '../models/vetements.model';
import multer from 'multer';

const router = express.Router();
const upload = multer();
/**
 * ROOT URL : '/dressing'
 */

/**
 * Get all dressings
 */
router.get('/', async (_req, res) => {
  console.log('[API] Get all Dressings');
  getDressings().then((listeDressings) => {
    res.status(ApiHTTPStatusEnum.OK).json(listeDressings);
  })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});

/**
 * Get dressing by id
 */
router.get(ServiceURLEnum.SERVICE_DRESSING_BY_ID, async (req, res) => {
  console.log('[API] Get Dressing by Id', req.params.idd);
  getDressingById(req.params.idd)
    .then((dressing) => {
      res.status(ApiHTTPStatusEnum.OK).json(dressing);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});


/**
 * ** VETEMENTS **
 */


/**
 * GET vetements du dressing
 */
router.get(ServiceURLEnum.SERVICE_VETEMENTS, async (req, res) => {
  console.log('[API] Get Vetements by Id Dressing', req.params.idd);
  getVetements(req.params.idd)
    .then((listeVetements) => {
      console.log('Nombre de vetements chargés : ', listeVetements.length);
      res.status(ApiHTTPStatusEnum.OK).json(listeVetements);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Vetements est introuvable');
    });
});


/**
 * POST (CREATE) vetements du dressing
 */
router.post(ServiceURLEnum.SERVICE_VETEMENTS, async (req, res) => {
  let vetement: VetementModel
  try {
    vetement = JSON.parse(req.body);
  } catch (error) {
    vetement = req.body;
  }
  console.log('[API] Création vêtement : ', vetement);
  saveVetement(vetement)
    .then((
      idSaved: string | null) => {
      console.log('Vêtement [', idSaved, '] ajouté dans le dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idVetement: idSaved });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement du vêtement a échoué");
    });
});


/**
 * POST (UPDATE) vetements du dressing
 */
router.post(ServiceURLEnum.SERVICE_VETEMENTS_BY_ID, async (req, res) => {

  let vetement: VetementModel
  try {
    vetement = JSON.parse(req.body);
  } catch (error) {
    vetement = req.body;
  }
  console.log('[API] Modification vêtement : ', vetement);

  updateVetement(vetement, req.params.idv)
    .then((idSaved: string | null) => {
      console.log('Vêtement [', idSaved, '] modifié dans le dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idVetement: idSaved });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement du vêtement a échoué");
    });
});


/**
 * DELETE) vetements du dressing
 */
router.delete(ServiceURLEnum.SERVICE_VETEMENTS_BY_ID, async (req, res) => {
  console.log('[API] Suppression vêtement : ', req.params.idv);
  deleteVetement(req.params.idd, req.params.idv)
    .then((ack: boolean) => {
      console.log('Vêtement [', req.params.idv, '] ' + (ack ? 'correctement' : 'non') + ' supprimé du dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idVetement: req.params.idv, deleted: ack });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("La suppression du vêtement a échoué");
    });
});

/**
 * POST (UPDATE) vetements du dressing - IMAGE
 */
router.post(ServiceURLEnum.SERVICE_VETEMENTS_IMAGE, upload.single('image'), async (req, res) => {

  console.log('[API] Enregistrement de l\'image du vêtement : ', req.params.idv);

  if (req.file) {

    updateImageVetement(req.params.idv, req.file.buffer)
      .then((idSaved: string | null) => {
        console.log('Image Vêtement [', idSaved, '] enregistrée dans le dressing [', req.params.idd, ']');
        res.status(ApiHTTPStatusEnum.OK).json({ idImage: idSaved });
      })
      .catch((err) => {
        console.error('Erreur MongoDB', err);
        res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de l\'image du vêtement a échoué");
      });
  } else {
    console.error('Erreur MongoDB', 'Aucune image trouvée dans la requête');
    res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de l\'image du vêtement a échoué");
  }
});


/**
 * GET vetements du dressing - IMAGE
 */
router.get(ServiceURLEnum.SERVICE_VETEMENTS_IMAGE, async (req, res) => {

  console.log('[API] Chargement de l\'image du vêtement : ', req.params.idv);
  getImages()
    .then((image: any) => {
      console.log('Image Vêtement []', image);
      res.status(ApiHTTPStatusEnum.OK)
        .set('Content-Type', 'image/jpg')
        .set('Content-Disposition', 'inline; filename="image.jpg"')
        .send(Buffer.alloc(image.size, image.image));
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("Le chargement de l\'image du vêtement a échoué");
    });
});
export default router;