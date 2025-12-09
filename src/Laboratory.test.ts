import {Laboratory} from './Laboratory';

describe('Laboratory', () => {

    test('should create an instance of Laboratory with known substances', () => {
        const substances = ['Water', 'Nitrogen'];
        const lab = new Laboratory(substances);
        expect(lab.knownSubstances).toEqual(substances);
    });

    test('should throw an error when initialized with unknown substances', () => {
        const substances = ['Water', 'Unobtainium', 'Acetone'];
        expect(() => new Laboratory(substances)).toThrow('Unknown substance: Unobtainium');
    });

    test(' should initialize substances  with a default quantity of 0', () => {
        const substances = ['Oxygen', 'Carbon'];
        const lab = new Laboratory(substances);
        for (const substance of lab.knownSubstances) {
            expect(substance).toBeDefined();
        }
    });

    test('should not allow duplicate substances', () => {
        const substances = ['Gold', 'Gold', 'Iron'];
        expect(() => new Laboratory(substances)).toThrow('Duplicate substance: Gold');
    });
});