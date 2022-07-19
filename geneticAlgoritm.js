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
console.log(get_individual_from_genotype(geno))


let individuals = [
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 123,
        "selection_probability": 0.344
    },
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 123,
        "selection_probability": 0.565
    },
    {
        "genotype": [1,2,3,0,0,0,0],
        "phenotype": [1,2,3],
        "fitness": 123,
        "selection_probability": 0.145
    }
]

console.log(individuals.map(indiv => indiv.selection_probability))