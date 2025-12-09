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

});