const VALID_SUBSTANCES = new Set([
    'Water', 'Nitrogen', 'Carbon', 'Oxygen', 'Gold', 'Iron'
]);

export class Laboratory {
    private readonly _knownSubstances: string[];
    private stock: Map<string, number>; 

        constructor(substances: string[]) {
            this.stock = new Map();
            // On utilisera une liste temporaire pour _knownSubstances à la fin

            for (const substance of substances) {
                // 1. Validation de l'existence (Ta logique actuelle)
                if (!VALID_SUBSTANCES.has(substance)) {
                    throw new Error(`Unknown substance: ${substance}`);
                }

                // 2. Validation des doublons
                if (this.stock.has(substance)) {
                    throw new Error(`Duplicate substance: ${substance}`);
                }

                // Si tout est bon, on ajoute
                this.stock.set(substance, 0.0);
            }

            // On remplit la propriété readonly à partir des clés du Map
            this._knownSubstances = Array.from(this.stock.keys());
        }

    public get knownSubstances(): string[] {
        return this._knownSubstances;
    }

    public getQuantity(substance: string): number {
        if(!this.stock.has(substance)) {
            throw new Error(`Substance not found: ${substance}`);
        }
        return this.stock.get(substance)!;
    }
}   