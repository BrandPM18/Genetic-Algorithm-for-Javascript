const get_individual_from_genotype = (__genotype) => {
    let __individual = {
        "genotype": __genotype,
    }

    __individual["phenotype"] = __genotype.slice(0,__genotype.indexOf(0))

    return __individual;
}

function get_fittest_genotype_for_mutation(__offsprings_genotypes) {
    return null;
}

console.log({
    "genotype": [1,2,3,0,0,0,0],
    "phenotype": [1,2,3],
    "fitness": 123,
    "selection_probability": 0.3445
})

let geno= [1,2,3,0,0,0]
// console.log(get_individual_from_genotype(geno))


let individuals = [
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 23,
        "selection_probability": 0.344
    },
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 13,
        "selection_probability": 0.565
    },
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 11,
        "selection_probability": 0.145
    }
]
let initialValue = 0;
console.log(individuals.reduce((prev,curr) => {
    return prev + curr.fitness
  }, initialValue))

// console.log(individuals.sort((a,b) => a.fitness - b.fitness))

function choise_samples(size,k=1) {
    let choises = []
    let i = 0;
    while (i < k) {
      let event = Math.floor(Math.random() *size);
      choises.push(event);
      i++;
    }
    return choises;
  }

