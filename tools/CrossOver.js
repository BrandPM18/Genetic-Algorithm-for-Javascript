class CrossOver_GA {

    constructor(_name= '',_indiv,eval_fitness,points = 1,prob_crossover = 0.8) {
        this._name = _name;
        this._indiv = _indiv;
        this._prob_crossover = prob_crossover;
        this.points = points;
        this.eval_fitness = eval_fitness;
    }

    execute() {
        if (Math.random()<this._prob_crossover) {
            switch (this._name) {
                case 'N puntos':                
                    return this.n_points();
                case 'mezcla':                
                    return this.shuffle();
                case 'promedio':                
                    return this.average();
                case 'sustitucion':
                    return this.point_rsc();
                default: // N puntos
                    return this.n_points();
            }
        }
        else {
            return this._indiv;
        }
    }

    one_point(parents,point_rsc = null) {
        let point_index = 0;
        if (point_rsc) {
            point_index = point_rsc;
        } else {
            point_index = Math.floor(Math.random()*(parents[0].genotype.length-1))
        }
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

    shuffle() {
        let [tmp_inv1, tmp_inv2] = this._indiv;
        for (let i = 0; i < this.points; i++) {
            let id = Math.floor(Math.random()*(tmp_inv1.genotype.length));
            console.log('swap ',id)
            let tmp_gen = tmp_inv1.genotype[id];
            tmp_inv1.genotype[id] = tmp_inv2.genotype[id];
            tmp_inv2.genotype[id] = tmp_gen;
        }
        return this.one_point([tmp_inv1,tmp_inv2]);
    }

    average() {
        let [tmp_inv1, tmp_inv2] = this._indiv;
        let children = {
            "genotype": []
        }
        for (let i = 0; i < tmp_inv1.genotype.length; i++) {
            children.genotype.push(
                Math.floor(
                    (tmp_inv1.genotype[i]+tmp_inv2.genotype[i])/2
                    )
                );
        }
        return [children]
    }

    point_rsc() {
        // rsc - reduced surrogate crossover
        let [tmp_inv1, tmp_inv2] = this._indiv;
        let rs_points = [] 
        tmp_inv1.genotype.forEach((curr,index) => {
            if (curr == tmp_inv2.genotype[index]){
                rs_points.push(index); 
            }
        });
        let rand_selector = Math.floor(Math.random() * (rs_points.length));
        return this.one_point([tmp_inv1,tmp_inv2],rs_points[rand_selector]);
    }
}

let individuals = [
    {
        "genotype": [1,2,3,4,5,6,7],
        "phenotype": [1,2,3],
        "fitness": 23,
        "selection_probability": 0.344
    },
    {
        "genotype": [0,2,0,0,5,0,0],
        "phenotype": [1,2,3],
        "fitness": 11,
        "selection_probability": 0.145
    }
]
const co = new CrossOver_GA('sustitucion',individuals,null,2);

console.log(co.execute())