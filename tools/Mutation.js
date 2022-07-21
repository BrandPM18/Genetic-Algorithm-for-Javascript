class Mutation_GA {

    constructor(_name, _indiv, fitness, prob_mutation = 1) {
        this._name = _name;
        this._indiv = _indiv;
        this.prob_mutation = prob_mutation;
    }
    
    execute() {
        if (Math.random()<this.prob_mutation) {
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
        let chain_iterator = Math.floor(Math.random() * (this._indiv.genotype.length - 3));
        let chain_length =  Math.floor(Math.random() * (this._indiv.genotype.length - chain_iterator - 1) + 3); 
        console.log(chain_iterator,chain_length);
        let sub_genotype = this._indiv.genotype.slice(chain_iterator,chain_iterator+chain_length); 
        let case_genotype = [];
        for (let i = 0; i < 3; i++) {
            let _mixed_sub_genotype = sub_genotype
            .map((_, i) => [Math.random(), i])
            .sort(([a], [b]) => a - b)
            .map(([, i]) => sub_genotype[i]);
            let genotype_init = this._indiv.genotype.slice(0,chain_iterator);
            let genotype_end =  this._indiv.genotype.slice(chain_iterator+chain_length,this._indiv.genotype.length);
            let new_genotype = genotype_init.concat(_mixed_sub_genotype).concat(genotype_end)
            console.log(new_genotype);
            
        }
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


let individuals = [
    {
        "genotype": [1,2,3,4,5,6,7,0,5,0,0],
        "phenotype": [1,2,3],
        "fitness": 23,
        "selection_probability": 0.344
    },
    {
        "genotype": [0,2,0,0,5,0,0],
        "phenotype": [1,2,3],
        "fitness": 8,
        "selection_probability": 0.145
    },
    {
      "genotype": [0,2,0,0,5,0,0],
      "phenotype": [1,2,3],
      "fitness": 11,
      "selection_probability": 0.145
    },
    {
      "genotype": [0,2,0,0,5,0,0],
      "phenotype": [1,2,3],
      "fitness": 15,
      "selection_probability": 0.145
  }
  ]
  
  //console.log(choice([1,5,10,2,4,6],4,[0.2,0.3,0.2,0.5,0.4,0.1]))
  
  const mut = new Mutation_GA('heuristico',individuals[0], null);
  
  console.log(mut.execute())