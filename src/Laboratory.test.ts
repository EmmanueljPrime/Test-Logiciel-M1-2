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

    test('should initialize substances  with a default quantity of 0', () => {
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

describe('Quantity', ()=> {

    test('should return 0 for all known substances by default', () => {
        const substances = ['Water', 'Nitrogen', 'Oxygen'];
        const lab = new Laboratory(substances);
        for (const substance of substances) {
            expect(lab.getQuantity(substance)).toBe(0);
        }
    });

    test('should return error when requesting for a substance not in the laboratory', () => {
        const substances = ['Water', 'Nitrogen', 'Oxygen'];
        const lab = new Laboratory(substances);
        expect(() => lab.getQuantity('Unobtainium')).toThrow('Substance not found: Unobtainium');
    });

    test('should return independent quantities for different substances', () => {
        const substances = ['Water', 'Nitrogen', 'Oxygen'];
        const lab = new Laboratory(substances);
        const waterQuantity = lab.getQuantity('Water');
        const nitrogenQuantity = lab.getQuantity('Nitrogen');
        expect(waterQuantity).toBe(0);
        expect(nitrogenQuantity).toBe(0);
    });
})

describe('Add stock', () => {
    let lab: Laboratory;

    beforeEach(() => {
        lab = new Laboratory(['Water', 'Nitrogen']);
    });

    test('should add quantity to an existing substance', () => {
        lab.addStock('Water', 10);
        expect(lab.getQuantity('Water')).toBe(10);
    });
    test('should accumulate quantity when adding multiple times', () => {
        lab.addStock('Water', 5);
        lab.addStock('Water', 15);
        expect(lab.getQuantity('Water')).toBe(20);
    });
    test('should throw an error when adding to a substance not in the laboratory', () => {
        expect(() => lab.addStock('Unobtainium', 10)).toThrow('Substance not found: Unobtainium');
    });
    test('should throw an error when adding a negative quantity', () => {
        expect(() => lab.addStock('Water', -5)).toThrow('Quantity to add must be non-negative');
    });
});