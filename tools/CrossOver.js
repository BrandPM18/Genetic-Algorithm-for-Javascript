class CrossOver_GA {

    constructor(_name= '', _indiv,points = 1,prob_crossover = 0.8) {
        this._name = _name;
        this._indiv = _indiv;
        this._prob_crossover = prob_crossover;
        this.points = points;
    }

    execute() {
        switch (this._name) {
            case 'N puntos':                
                return this.n_points();
            case 'heuristico':                
                this.heuristic();
            case 'uniforme':                
                this.uniform();
            case 'promedio':                
                this.average();
            default: // N puntos
                return this.n_points();
        }

    }

    n_points() {
        return 'srr'
    }

    heuristic() {
        return 'srr'
    }

    uniform() {
        return 'srr'
    }

    average() {
        return 'srr'
    }

}

const co = new CrossOver_GA('w',[1,2,3,4]);

console.log(co.execute()) 