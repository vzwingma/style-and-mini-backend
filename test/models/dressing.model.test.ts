import { ObjectId } from 'mongodb';
import { mongoModelToDressingModel } from '../../src/models/dressing.model';
import { CategorieDressingEnum } from '../../src/constants/AppEnum';

// ─── mongoModelToDressingModel ────────────────────────────────────────────────
describe('mongoModelToDressingModel', () => {

  it('cas nominal : convertit _id.toString() en id et mappe tous les champs', () => {
    const _id = new ObjectId();
    const mongoDressing = {
      _id,
      libelle  : 'Dressing Adulte',
      categorie: CategorieDressingEnum.ADULTE,
    };

    const result = mongoModelToDressingModel(mongoDressing);

    expect(result.id).toBe(_id.toString());
    expect(result.libelle).toBe('Dressing Adulte');
    expect(result.categorie).toBe(CategorieDressingEnum.ADULTE);
  });

  it('catégorie BEBE : est bien mappée', () => {
    const _id = new ObjectId();
    const mongoDressing = {
      _id,
      libelle  : 'Dressing Bébé',
      categorie: CategorieDressingEnum.BEBE,
    };

    const result = mongoModelToDressingModel(mongoDressing);

    expect(result.categorie).toBe(CategorieDressingEnum.BEBE);
  });

  it('catégorie ENFANT : est bien mappée', () => {
    const _id = new ObjectId();
    const mongoDressing = {
      _id,
      libelle  : 'Dressing Enfant',
      categorie: CategorieDressingEnum.ENFANT,
    };

    const result = mongoModelToDressingModel(mongoDressing);

    expect(result.categorie).toBe(CategorieDressingEnum.ENFANT);
  });

  it('deux ObjectId distincts produisent deux id distincts', () => {
    const _id1 = new ObjectId();
    const _id2 = new ObjectId();

    const r1 = mongoModelToDressingModel({ _id: _id1, libelle: 'D1', categorie: CategorieDressingEnum.ADULTE });
    const r2 = mongoModelToDressingModel({ _id: _id2, libelle: 'D2', categorie: CategorieDressingEnum.ADULTE });

    expect(r1.id).not.toBe(r2.id);
  });
});
