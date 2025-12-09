// Définitions de types exportées pour être réutilisables
export type Ingredient = { quantity: number; substance: string };
export type Reactions = Record<string, Ingredient[]>;

const VALID_SUBSTANCES = new Set([
    'Water', 'Nitrogen', 'Carbon', 'Oxygen', 'Gold', 'Iron', 'Hydrogen', 'Chlorine', 'Sodium'
]);

export class Laboratory {
    private stock: Map<string, number> = new Map();
    private readonly reactions: Reactions;

    constructor(initialSubstances: string[], reactions: Reactions = {}) {
        this.reactions = reactions;

        initialSubstances.forEach(sub => this.registerBaseSubstance(sub));

        Object.keys(this.reactions).forEach(product => {
            if (!this.stock.has(product)) {
                this.stock.set(product, 0);
            }
        });
    }

    public get knownSubstances(): string[] {
        return Array.from(this.stock.keys());
    }

    public getQuantity(name: string): number {
        const quantity = this.stock.get(name);
        if (quantity === undefined) {
            throw new Error(`Substance not found: ${name}`);
        }
        return quantity;
    }

    public addStock(name: string, amount: number): void {
        if (amount < 0) {
            throw new Error('Quantity to add must be non-negative');
        }

        const currentQuantity = this.getQuantity(name);
        
        this.stock.set(name, currentQuantity + amount);
    }

    private registerBaseSubstance(substance: string): void {
        if (!VALID_SUBSTANCES.has(substance)) {
            throw new Error(`Unknown substance: ${substance}`);
        }
        if (this.stock.has(substance)) {
            throw new Error(`Duplicate substance: ${substance}`);
        }
        this.stock.set(substance, 0);
    }
}
