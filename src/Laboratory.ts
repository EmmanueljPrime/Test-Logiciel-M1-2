const VALID_SUBSTANCES = new Set([
    'Water', 'Nitrogen', 'Carbon', 'Oxygen', 'Gold', 'Iron'
]);

export class Laboratory {
    private readonly _knownSubstances: string[];
    private stock: Map<string, number>; 

        constructor(substances: string[]) {
            this.stock = new Map();

            for (const substance of substances) {
                if (!VALID_SUBSTANCES.has(substance)) {
                    throw new Error(`Unknown substance: ${substance}`);
                }

                if (this.stock.has(substance)) {
                    throw new Error(`Duplicate substance: ${substance}`);
                }

                this.stock.set(substance, 0.0);
            }

            this._knownSubstances = Array.from(this.stock.keys());
        }

    public get knownSubstances(): string[] {
        return this._knownSubstances;
    }

    public getQuantity(substance: string): number {

        const quantity = this.stock.get(substance);

        if(quantity === undefined) {
            throw new Error(`Substance not found: ${substance}`);
        }
        return quantity;
    }
}   