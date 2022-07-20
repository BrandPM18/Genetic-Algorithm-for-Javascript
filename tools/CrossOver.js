class CrossOver_GA {

    constructor(_name= '',_indiv,points = 1,prob_crossover = 0.8) {
        this._name = _name;
        this._indiv = _indiv;
        this._prob_crossover = prob_crossover;
        this.points = points;
    }

    execute() {
        if (Math.random()<this._prob_crossover) {
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
        else {
            return this._indiv;
        }
    }

    one_point(parents) {
        const point_index = Math.floor(Math.random()*(parents[0].genotype.length-1))
        let childrens = []
        console.log('one_point',point_index);
        for (let i = 0; i < parents.length; i++) {
            let children = {
                "genotype": []
            }
            children.genotype =  parents[i%2].genotype.slice(0,point_index)
            .concat(parents[(i+1)%2].genotype.slice(point_index,parents[0].genotype.length));
            
            childrens.push(children);
        }
        return childrens;
    }

    n_points() {
        let [tmp_inv1, tmp_inv2] = this._indiv;
        let tmp_childs = [];
        for (let i = 0; i < this.points;i++) {
            tmp_childs = this.one_point([tmp_inv1,tmp_inv2]);
            [tmp_inv1,tmp_inv2] = tmp_childs;
        }
        return tmp_childs
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

let individuals = [
    {
        "genotype": [1,2,3,0,0,2,3],
        "phenotype": [1,2,3],
        "fitness": 23,
        "selection_probability": 0.344
    },
    {
        "genotype": [1,3,4,5,2,1,4],
        "phenotype": [1,2,3],
        "fitness": 11,
        "selection_probability": 0.145
    }
]
const co = new CrossOver_GA('w',individuals,2);

console.log(co.execute())