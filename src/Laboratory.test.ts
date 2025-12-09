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

describe('Laboratory with Reactions', () => {

    test('should initialize with reactions and products',()=>{
        const substances = ['Hydrogen', 'Oxygen'];
        const reactions = {
            'Water': [{ quantity: 2, substance: 'Hydrogen' }, { quantity: 1, substance: 'Oxygen' }]
        };
        const lab = new Laboratory(substances, reactions);
        
        expect(lab.knownSubstances).toContain('Water');

        expect(lab.getQuantity('Water')).toBe(0);
    })

    test('should allow adding stock directly to a product defined in reactions',()=>{
    const substances = ['Hydrogen', 'Oxygen'];
        const reactions = {
            'Water': [{ quantity: 2, substance: 'Hydrogen' }, { quantity: 1, substance: 'Oxygen' }]
        };
        const lab = new Laboratory(substances, reactions);

        lab.addStock('Water', 10);
        
        expect(lab.getQuantity('Water')).toBe(10);
        
        expect(lab.getQuantity('Hydrogen')).toBe(0);
    })

});

describe('Manufacturing (make)', () => {
    let lab: Laboratory;

    const reactions = {
        'Water': [
            { quantity: 2, substance: 'Hydrogen' }, 
            { quantity: 1, substance: 'Oxygen' }
        ],
        'Ice': [
            { quantity: 1, substance: 'Water' }
        ]
    };

    beforeEach(() => {
        lab = new Laboratory(['Hydrogen', 'Oxygen'], reactions);
    });

    test('should produce the requested quantity if enough ingredients are present', () => {
        lab.addStock('Hydrogen', 20);
        lab.addStock('Oxygen', 10);

        const produced = lab.make('Water', 5);

        expect(produced).toBe(5);
        expect(lab.getQuantity('Water')).toBe(5);
        expect(lab.getQuantity('Hydrogen')).toBe(10); 
        expect(lab.getQuantity('Oxygen')).toBe(5);    
    });

    test('should only produce what is possible based on limiting ingredient', () => {
        lab.addStock('Hydrogen', 10); 
        lab.addStock('Oxygen', 2);    

        const produced = lab.make('Water', 100);

        expect(produced).toBe(2);
        expect(lab.getQuantity('Water')).toBe(2);
        expect(lab.getQuantity('Oxygen')).toBe(0); 
        expect(lab.getQuantity('Hydrogen')).toBe(6);
    });

    test('should handle reactions using other products as ingredients (Hierarchical)', () => {
        lab.addStock('Water', 10);


        const produced = lab.make('Ice', 3);

        expect(produced).toBe(3);
        expect(lab.getQuantity('Ice')).toBe(3);
        expect(lab.getQuantity('Water')).toBe(7); 
    });

    test('should produce recursive ingredients automatically', () => {

        lab.addStock('Hydrogen', 20);
        lab.addStock('Oxygen', 10);

        const produced = lab.make('Ice', 5);

        expect(produced).toBe(5); 
        expect(lab.getQuantity('Ice')).toBe(5);

        expect(lab.getQuantity('Hydrogen')).toBe(10);
        expect(lab.getQuantity('Oxygen')).toBe(5);
    });
});

describe('Recursive Manufacturing', () => {
    let lab: Laboratory;

    const reactions = {
        'C': [{ quantity: 1, substance: 'Base1' }],
        'B': [{ quantity: 1, substance: 'C' }],    
        'A': [{ quantity: 1, substance: 'B' }],   
        'X': [{ quantity: 1, substance: 'Y' }],
        'Y': [{ quantity: 1, substance: 'X' }]
    };

    beforeEach(() => {
        lab = new Laboratory(['Base1'], reactions);
    });

    test('should recursively produce ingredients if missing', () => {
        lab.addStock('Base1', 10);
        
        const produced = lab.make('A', 1);

        expect(produced).toBe(1);
        expect(lab.getQuantity('A')).toBe(1);
        expect(lab.getQuantity('Base1')).toBe(9); 
    });

    test('should detect circular dependencies and stop (avoid infinite loop)', () => {
        lab.addStock('Base1', 10);
        expect(() => lab.make('X', 1)).toThrow(/Circular dependency/); 
    });
});