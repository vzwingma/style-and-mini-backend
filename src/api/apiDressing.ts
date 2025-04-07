import express from 'express';
import { deleteVetement, getDressingById, getDressings, getVetements, saveVetement, updateVetement } from '../controllers/dressing.controller';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import VetementModel from '../models/vetements.model';
import { createPresignedS3Url } from '../services/S3.Service';

const router = express.Router();
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
 * Extrait un objet VetementModel à partir de la requête HTTP.
 * 
 * Cette fonction tente de parser le corps de la requête en tant que JSON.
 * Si une erreur survient lors du parsing, elle retourne directement le corps
 * de la requête tel quel.
 * 
 * @param req - La requête HTTP de type `express.Request` contenant les données du vêtement.
 * @returns Un objet de type `VetementModel` extrait du corps de la requête.
 */
const getVetementFromRequest = (req: express.Request): VetementModel => {
  let vetement: VetementModel
  try {
    vetement = JSON.parse(req.body);
  } catch (error) {
    vetement = req.body;
  }
  return vetement;
}
/**
 * POST (CREATE) vetements du dressing
 */
router.post(ServiceURLEnum.SERVICE_VETEMENTS, async (req, res) => {
  let vetement = getVetementFromRequest(req);
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

  let vetement = getVetementFromRequest(req);
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
 * DELETE vetements du dressing
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
 * PUT IMAGE vetements du dressing to S3
 * Génère une URL signée pour le téléchargement de l'image du vêtement.
 * Le fichier est enregistré dans le bucket S3 avec le nom du vêtement et l'extension .jpg.
 */
router.put(ServiceURLEnum.SERVICE_VETEMENTS_IMAGE, async (req, res) => {

  console.log('[API]', 'Enregistrement de l\'image du vêtement : ', req.params.idv);
    // Get signed URL from S3 and upload image to S3
    createPresignedS3Url(req.params.idv + ".jpg")
      .then((presignedS3Url) => {
        console.log('URL présignée disponible pour le vêtement [', req.params.idv, ']');
        res.status(ApiHTTPStatusEnum.OK)
          .json(
            {
              url: presignedS3Url,
              id: req.params.idv + ".jpg",
            });
      })
      .catch((err) => {
        console.error('[API]', 'Erreur lors du chargement de l\'URL présignée', err);
        res.status(ApiHTTPStatusEnum.INTERNAL_ERROR)
          .json(
            {
              message: 'Erreur lors du chargement d\'image pour le vêtement ' + req.params.idv,
              error: err,
            });
      });
  });




/**
 * GET vetements du dressing - IMAGE
 */
router.get(ServiceURLEnum.SERVICE_VETEMENTS_IMAGE, async (req, res) => {

  console.log('[API] Chargement de l\'image du vêtement : ', req.params.idv);
  res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("Le chargement de l'image du vêtement a échoué");
});
export default router;