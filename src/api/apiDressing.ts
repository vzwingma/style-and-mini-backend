import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';

import { createPresignedS3Url } from '../services/S3.Service';
import APIResultFormVetementModel from '../models/apiResults/api.result.vetements.model';
import { v7 as uuidGen } from 'uuid';
import APIResultFormTenueModel from '../models/apiResults/api.result.tenues.model';
import VetementModel from '../models/vetements/vetements.model';
import { getDressingById, getDressings } from '../controllers/dressing.controller';
import { deleteVetement, getVetements, saveVetement, updateVetement } from '../controllers/vetements.controller';
import { countTenues, deleteTenue, getTenues, saveTenue, updateTenue } from '../controllers/tenues.controller';
import TenueModel from '../models/tenues/tenue.model';
import CapsuleModel from '../models/capsules/capsules.model';
import APIResultFormCapsuleModel from '../models/apiResults/api.result.capsules.model';
import { countCapsules, deleteCapsule, getCapsules, saveCapsule, updateCapsule } from '../controllers/capsules.controller';

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
      idSaved: string) => {
        vetement.id = idSaved;
        console.log('Vêtement [', idSaved, '] ajouté dans le dressing [', req.params.idd, ']', vetement);
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, vetement : vetement, created: true  } as APIResultFormVetementModel);
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
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, vetement : vetement, updated: true } as APIResultFormVetementModel);
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
      res.status(ApiHTTPStatusEnum.OK).json({ id: req.params.idv, deleted: ack } as APIResultFormVetementModel);
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

  const idImage = uuidGen().replaceAll("-", "").substring(0,24);
  const idVetement = req.params.idv === "undefined" ? "[NOUVEAU]": req.params.idv;
  console.log('[API]', 'Enregistrement de l\'image [', idImage, '] du vêtement [', idVetement, ']');
    // Get signed URL from S3 and upload image to S3
    createPresignedS3Url(idImage + ".jpg")
      .then((presignedS3Url) => {
        console.log('URL présignée disponible pour le vêtement [', idVetement, ']');
        res.status(ApiHTTPStatusEnum.OK)
          .json(
            {
              url   : presignedS3Url,
              s3uri : process.env.NODE_ENV+ "/" + idImage + ".jpg",
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
 * ** TENUES **
 */


/**
 * GET tenues du dressing
 */
router.get(ServiceURLEnum.SERVICE_TENUES, async (req, res) => {
  
  if(req.query.count === undefined){
    console.log('[API] Get Tenues by Id Dressing', req.params.idd);
    getTenues(req.params.idd)
    .then((listeTenues) => {
      console.log('Nombre de tenues chargées : ', listeTenues.length);
      res.status(ApiHTTPStatusEnum.OK).json(listeTenues);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Tenues est introuvable');
    });
  }
  else{
    console.log('[API] Count Tenues by Id Dressing', req.params.idd);
    countTenues(req.params.idd)
    .then((nbTenues) => {
      console.log('Nombre de tenues chargées : ', nbTenues);
      res.status(ApiHTTPStatusEnum.OK).json(nbTenues);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Tenues est introuvable');
    });

  }
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
const getTenueFromRequest = (req: express.Request): TenueModel => {
  let tenue: TenueModel
  try {
    tenue = JSON.parse(req.body);
  } catch (error) {
    tenue = req.body;
  }
  return tenue;
}
/**
 * POST (CREATE) tenues du dressing
 */
router.post(ServiceURLEnum.SERVICE_TENUES, async (req, res) => {
  let tenue = getTenueFromRequest(req);
  console.log('[API] Création tenue : ', tenue);
  saveTenue(tenue)
    .then((
      idSaved: string) => {
        tenue.id = idSaved;
        console.log('Tenue [', idSaved, '] ajouté dans le dressing [', req.params.idd, ']', tenue);
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, tenue : tenue, created: true  } as APIResultFormTenueModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de la tenue a échoué");
    });
});


/**
 * POST (UPDATE) tenues du dressing
 */
router.post(ServiceURLEnum.SERVICE_TENUES_BY_ID, async (req, res) => {

  let tenue = getTenueFromRequest(req);
  console.log('[API] Modification tenue : ', tenue);

  updateTenue(tenue, req.params.idt)
    .then((idSaved: string | null) => {
      console.log('Tenue [', idSaved, '] modifié dans le dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, tenue : tenue, updated: true } as APIResultFormTenueModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de la tenue a échoué");
    });
});


/**
 * DELETE tenues du dressing
 */
router.delete(ServiceURLEnum.SERVICE_TENUES_BY_ID, async (req, res) => {
  console.log('[API] Suppression tenue : ', req.params.idt);
  deleteTenue(req.params.idd, req.params.idt)
    .then((ack: boolean) => {
      console.log('Tenue [', req.params.idt, '] ' + (ack ? 'correctement' : 'non') + ' supprimé du dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ id: req.params.idt, deleted: ack } as APIResultFormTenueModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("La suppression de la tenue a échoué");
    });
});





/**
 * ** CAPSULES **
 */


/**
 * GET capsules du dressing
 */
router.get(ServiceURLEnum.SERVICE_CAPSULES, async (req, res) => {
  if(req.query.count === undefined){
  console.log('[API] Get Capsules by Id Dressing', req.params.idd);
  getCapsules(req.params.idd)
    .then((listeCapsules) => {
      console.log('Nombre de capsules chargées : ', listeCapsules.length);
      res.status(ApiHTTPStatusEnum.OK).json(listeCapsules);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Capsules est introuvable');
    });
  }
  else{
    console.log('[API] Count Capsules by Id Dressing', req.params.idd);
    countCapsules(req.params.idd)
    .then((nbCapsules) => {
      console.log('Nombre de capsules chargées : ', nbCapsules);
      res.status(ApiHTTPStatusEnum.OK).json(nbCapsules);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send('La collection Capsules est introuvable');
    });

  }
});



/**
 * Extrait un objet CapsuleModel à partir de la requête HTTP.
 * 
 * Cette fonction tente de parser le corps de la requête en tant que JSON.
 * Si une erreur survient lors du parsing, elle retourne directement le corps
 * de la requête tel quel.
 * 
 * @param req - La requête HTTP de type `express.Request` contenant les données du vêtement.
 * @returns Un objet de type `CapsuleModel` extrait du corps de la requête.
 */
const getCapsuleFromRequest = (req: express.Request): CapsuleModel => {
  let capsule: CapsuleModel
  try {
    capsule = JSON.parse(req.body);
  } catch (error) {
    capsule = req.body;
  }
  return capsule;
}
/**
 * POST (CREATE) capsules du dressing
 */
router.post(ServiceURLEnum.SERVICE_CAPSULES, async (req, res) => {
  let capsule = getCapsuleFromRequest(req);
  console.log('[API] Création capsule : ', capsule);
  saveCapsule(capsule)
    .then((
      idSaved: string) => {
        capsule.id = idSaved;
        console.log('Capsule [', idSaved, '] ajouté dans le dressing [', req.params.idd, ']', capsule);
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, capsule : capsule, created: true  } as APIResultFormCapsuleModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de la capsule a échoué");
    });
});


/**
 * POST (UPDATE) capsules du dressing
 */
router.post(ServiceURLEnum.SERVICE_CAPSULES_BY_ID, async (req, res) => {

  let capsule = getCapsuleFromRequest(req);
  console.log('[API] Modification caspule : ', capsule);

  updateCapsule(capsule, req.params.idc)
    .then((idSaved: string | null) => {
      console.log('Capsule [', idSaved, '] modifié dans le dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ id: idSaved, capsule : capsule, updated: true } as APIResultFormCapsuleModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("L'enregistrement de la capsule a échoué");
    });
});


/**
 * DELETE capsules du dressing
 */
router.delete(ServiceURLEnum.SERVICE_CAPSULES_BY_ID, async (req, res) => {
  console.log('[API] Suppression capsule : ', req.params.idc);
  deleteCapsule(req.params.idd, req.params.idc)
    .then((ack: boolean) => {
      console.log('Capsule [', req.params.idc, '] ' + (ack ? 'correctement' : 'non') + ' supprimé du dressing [', req.params.idd, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ id: req.params.idc, deleted: ack } as APIResultFormTenueModel);
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send("La suppression de la capsule a échoué");
    });
});

export default router;