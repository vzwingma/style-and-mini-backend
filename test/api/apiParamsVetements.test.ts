import express from 'express';
import request from 'supertest';
import basicAuth from 'express-basic-auth';
import apiParamsVetements from '../../src/api/apiParamsVetements';
import { ParametragesVetementEnum } from '../../src/constants/AppEnum';

// ─── Mocks ────────────────────────────────────────────────────────────────────
// On utilise des factories pour éviter l'instanciation de MongoClient au chargement du module
jest.mock('../../src/controllers/params.controller', () => ({
  getParametresVetements: jest.fn(),
  saveParametrage       : jest.fn(),
  updateParametrage     : jest.fn(),
  deleteParametrage     : jest.fn(),
}));
jest.mock('../../src/services/mongodb.service', () => ({
  connectToDatabase  : jest.fn(),
  findInCollections  : jest.fn(),
  findInCollection   : jest.fn(),
  countInCollection  : jest.fn(),
  save               : jest.fn(),
  update             : jest.fn(),
  deleteInMongo      : jest.fn(),
}));
jest.mock('../../src/services/params.service', () => ({
  loadParametrages: jest.fn(),
}));

import {
  getParametresVetements,
  saveParametrage,
  deleteParametrage,
} from '../../src/controllers/params.controller';

const mockGetParametresVetements = getParametresVetements as jest.MockedFunction<typeof getParametresVetements>;
const mockSaveParametrage        = saveParametrage        as jest.MockedFunction<typeof saveParametrage>;
const mockDeleteParametrage      = deleteParametrage      as jest.MockedFunction<typeof deleteParametrage>;

// ─── App de test ──────────────────────────────────────────────────────────────
/**
 * On crée une mini-application Express pour les tests,
 * sans déclencher le démarrage du vrai serveur (app.ts).
 */
const buildTestApp = () => {
  const app = express();
  app.use(basicAuth({
    users: { dev: 'password' },
    challenge: true,
    unauthorizedResponse: 'Unauthorized',
  }));
  app.use(express.json({ strict: true }));
  app.use('/api/v1/params/vetements', apiParamsVetements);
  return app;
};

const testApp = buildTestApp();

// Header Basic Auth pour dev:password (base64 = ZGV2OnBhc3N3b3Jk)
const AUTH_HEADER = 'Basic ZGV2OnBhc3N3b3Jk';

// ─── Tests des routes /api/v1/params/vetements ────────────────────────────────
describe('Routes API /api/v1/params/vetements', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── GET /:type ──────────────────────────────────────────────────────────────
  describe('GET /api/v1/params/vetements/:type', () => {

    it('type TYPES valide → 200 avec un tableau', async () => {
      const mockData = [
        { id: 'id1', libelle: 'T-shirt', categories: [] },
        { id: 'id2', libelle: 'Pantalon', categories: [] },
      ];
      mockGetParametresVetements.mockResolvedValue(mockData as any);

      const res = await request(testApp)
        .get(`/api/v1/params/vetements/${ParametragesVetementEnum.TYPES}`)
        .set('Authorization', AUTH_HEADER);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });

    it('type inconnu → le controller lève une erreur → 500', async () => {
      mockGetParametresVetements.mockRejectedValue(new Error('Type de paramètre inconnu : TYPE_INCONNU'));

      const res = await request(testApp)
        .get('/api/v1/params/vetements/TYPE_INCONNU')
        .set('Authorization', AUTH_HEADER);

      // La route récupère l'erreur dans .catch() et renvoie 500
      expect(res.status).toBe(500);
    });

    it('sans authentification → 401', async () => {
      const res = await request(testApp)
        .get(`/api/v1/params/vetements/${ParametragesVetementEnum.TYPES}`);
      expect(res.status).toBe(401);
    });
  });

  // ── POST /:type (création) ──────────────────────────────────────────────────
  describe('POST /api/v1/params/vetements/:type', () => {

    it('type TYPES valide → 200 avec { idParametrage }', async () => {
      mockSaveParametrage.mockResolvedValue('nouvel-id-123');

      const body = { id: null, libelle: 'Chemise', categories: ['ADULTE'], types: ['VETEMENTS'] };

      const res = await request(testApp)
        .post(`/api/v1/params/vetements/${ParametragesVetementEnum.TYPES}`)
        .set('Authorization', AUTH_HEADER)
        .send(body);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('idParametrage', 'nouvel-id-123');
    });

    it('type invalide → le controller lève une erreur → 500', async () => {
      mockSaveParametrage.mockRejectedValue(new Error('Type de paramètre inconnu'));

      const res = await request(testApp)
        .post('/api/v1/params/vetements/TYPE_INVALIDE')
        .set('Authorization', AUTH_HEADER)
        .send({});

      expect(res.status).toBe(500);
    });
  });

  // ── DELETE /:type/:idp ──────────────────────────────────────────────────────
  describe('DELETE /api/v1/params/vetements/:type/:idp', () => {

    it('type TYPES valide et id param → 200', async () => {
      mockDeleteParametrage.mockResolvedValue(true);

      const idParam = '507f1f77bcf86cd799439011';
      const res = await request(testApp)
        .delete(`/api/v1/params/vetements/${ParametragesVetementEnum.TYPES}/${idParam}`)
        .set('Authorization', AUTH_HEADER);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('idParametrage', true);
    });

    it('type invalide → le controller lève une erreur → 500', async () => {
      mockDeleteParametrage.mockRejectedValue(new Error('Type de paramètre inconnu'));

      const res = await request(testApp)
        .delete('/api/v1/params/vetements/TYPE_INVALIDE/some-id')
        .set('Authorization', AUTH_HEADER);

      expect(res.status).toBe(500);
    });
  });
});
