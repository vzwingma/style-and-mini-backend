import { getParametresVetements } from '../../src/controllers/params.controller';
import { ParametragesVetementEnum } from '../../src/constants/AppEnum';
import { MONGO_DB_COLLECTIONS } from '../../src/constants/AppConstants';

// ─── Mocks ────────────────────────────────────────────────────────────────────
// On utilise des factories pour éviter l'instanciation de MongoClient au chargement du module
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

import { loadParametrages } from '../../src/services/params.service';

const mockLoadParametrages = loadParametrages as jest.MockedFunction<typeof loadParametrages>;

// ─── getParametresVetements ───────────────────────────────────────────────────
describe('getParametresVetements', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadParametrages.mockResolvedValue([]);
  });

  it('type TYPES : appelle loadParametrages avec la collection PARAM_TYPES_VETEMENTS', async () => {
    await getParametresVetements(ParametragesVetementEnum.TYPES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS,
      ParametragesVetementEnum.TYPES
    );
  });

  it('type TAILLES : appelle loadParametrages avec la collection PARAM_TAILLES_MESURES', async () => {
    await getParametresVetements(ParametragesVetementEnum.TAILLES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES,
      ParametragesVetementEnum.TAILLES
    );
  });

  it('type USAGES : appelle loadParametrages avec la collection PARAM_USAGES_VETEMENTS', async () => {
    await getParametresVetements(ParametragesVetementEnum.USAGES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS,
      ParametragesVetementEnum.USAGES
    );
  });

  it('type ETATS : appelle loadParametrages avec la collection PARAM_ETATS_VETEMENTS', async () => {
    await getParametresVetements(ParametragesVetementEnum.ETATS);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS,
      ParametragesVetementEnum.ETATS
    );
  });

  it('type MARQUES : appelle loadParametrages avec la collection PARAM_MARQUES_VETEMENTS', async () => {
    await getParametresVetements(ParametragesVetementEnum.MARQUES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS,
      ParametragesVetementEnum.MARQUES
    );
  });

  it('type invalide (DRESSING) : throw une Error "Type de paramètre inconnu"', () => {
    expect(() => getParametresVetements(ParametragesVetementEnum.DRESSING))
      .toThrow('Type de paramètre inconnu');
  });

  it('retourne un tableau vide quand loadParametrages renvoie []', async () => {
    mockLoadParametrages.mockResolvedValue([]);
    const result = await getParametresVetements(ParametragesVetementEnum.TYPES);
    expect(result).toEqual([]);
  });
});
