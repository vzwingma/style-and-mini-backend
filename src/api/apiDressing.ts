import express from 'express';
import { deleteVetement, getDressingById, getDressings, getVetements, saveVetement, updateVetement } from '../controllers/dressing.controller';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';

const router = express.Router();

/**
 * ROOT URL : '/dressing'
 */

/**
 * Get all dressings
 */
router.get('/', async (req, res) => {

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
  console.log('Get Dressing by Id', req.params.idd);
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
  console.log('Get Vetements by Id Dressing', req.params.idd);
  getVetements(req.params.idd)
    .then((listeVetements) => {
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
  saveVetement(req.body)
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

  updateVetement(req.body, req.params.idv)
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

  deleteVetement(req.params.idd, req.params.idv)
    .then((ack: boolean) => {
      console.log('Vêtement [', req.params.idv, '] '+(ack ? 'correctement':'non')+  ' supprimé du dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idVetement: req.params.idv, deleted: ack });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("La suppression du vêtement a échoué");
    });
});


export default router;