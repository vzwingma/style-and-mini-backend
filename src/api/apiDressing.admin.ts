import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { patchVetements } from '../controllers/dressing.patch.controller';

const router = express.Router();

/**
 * ROOT URL : '/admin/dressing'
 */



/**
 * ** VETEMENTS **
 */


/**
 * UPDATE vetements du dressing
 */
router.patch(ServiceURLEnum.SERVICE_VETEMENTS, async (req, res) => {
  console.log('PATCH Vetements by Id Dressing', req.params.idd);
  patchVetements(req.params.idd)
    .then((listeVetements) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeVetements);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Vetements est introuvable');
    });
});



export default router;