const VALID_SUBSTANCES = new Set([
    'Water', 'Nitrogen', 'Carbon', 'Oxygen', 'Gold', 'Iron'
]);

export class Laboratory {
    private readonly _knownSubstances: string[];

    constructor(substances: string[]) {
        for (const substance of substances) {
            if (!VALID_SUBSTANCES.has(substance)) {
                throw new Error(`Unknown substance: ${substance}`);
            }
        }
        this._knownSubstances = substances;
    }

    public get knownSubstances(): string[] {
        return this._knownSubstances;
    }
}   