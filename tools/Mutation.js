class Mutation_GA {

    constructor(_name, _indiv,prob_mutation = 0.1) {
        this._name = _name;
        this._indiv = _indiv;
        this.prob_mutation = prob_mutation;
    }
    
    execute() {
        if (Math.random()<this._prob_crossover) {
            switch (this._name) {
                case 'intercambio':                
                    return this.swap();
                case 'inserción':                
                    return this.insertion();
                case 'uniforme':                
                    return this.uniform();
                case 'inversión':                
                    return this.invert();
                case 'mezcla':                
                    return this.scramble();
                case 'heuristico':                
                    return this.heuristic();
                default: // intercambio
                    return this.swap();
            }
        }
    }

    swap() {
        return 'srr'
    }

    heuristic() {
        return 'srr'
    }

    uniform() {
        return 'srr'
    }

    insertion() {
        return 'srr'
    }

    invert() {
        return 'srr'
    }

    scramble() {
        return 'srr'
    }

}

