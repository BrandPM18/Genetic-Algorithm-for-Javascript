function choice(events, size, probability, repetition= false) {
  if(probability != null) {
    const probSum = probability.reduce((sum, v) => sum + v);
    if(probSum < 1 - Number.EPSILON || probSum > 1 + Number.EPSILON) {
      //throw Error("La probabilidad global tiene que ser 1.");
      probability = probability.map((v) => v/probSum);
    }
    if(probability.find((p) => p < 0) != undefined) {
      throw Error("La probabilidad no puede contener valores negativos");
    }
    if(events.length != probability.length) {
      throw Error("Los eventos tienen que tener la misma longitud que la probabilidad");
    }
  } else {
    probability = new Array(events.length).fill(1/events.length);
  }

  var probabilityRanges = probability.reduce((ranges, v, i) => {
    var start = i > 0 ? ranges[i-1][1] : 0 - Number.EPSILON;
    ranges.push([start, v + start + Number.EPSILON]);
    return ranges;
  }, []);

  var choices = new Array();
  var i = 0;
  while( i < size ){
    var random = Math.random();
    var rangeIndex = probabilityRanges.findIndex((v, i) => random > v[0] && random <= v[1]);
    if (!repetition) {
      if(choices.indexOf(events[rangeIndex])===-1) {
        choices.push(events[rangeIndex]);
        i++;
      }
    } else {
      choices.push(events[rangeIndex]);
      i++;
    }
  }
  return choices;
}

function minimum(events) {
  return events.reduce((prev,curr) => {
    return prev.fitness < curr.fitness ? prev : curr;
})
}

function sumator_fit(events) {
  let initialValue = 0;
  return events.reduce((prev,curr) => {
    return prev + curr.fitness
  }, initialValue)
}

function choise_samples(events,k=1,repetition=false) {
  let choises = []
  let i = 0;
  while (i < k) {
    let event = events[Math.floor(Math.random() *(events.length-1))];
    if(!repetition) {
      if(choises.indexOf(event) === -1) {
          choises.push(event);
          i++;    
      }
    } else {
      choises.push(event);
      i++;    
    }
  }
  return choises;
}

function samples_array(size,k=2) {
  let choises = []
  let i = 0;
  while (i < k) {
    let event = Math.floor(Math.random() *size);
    choises.push(event);
    i++;
  }
  return choises;
}


class Selection_GA {

  constructor(_name, _indiv, _size=1, _param = 1) {
    this._name = _name;
    this._indiv = _indiv;
    this._size = _size;
    this._param = _param;
  }
  
  execute() {
    switch (this._name) {
      case 'ruleta':                
        return this.roulette();
      case 'ranking lineal':                
        return this.lineal_rank();
      case 'torneo':                
        return this.tournament();
      case 'uniforme':                
        return this.uniform();
      case 'boltzman':                
        return this.boltzman();
      default: // ruleta
        return this.roulette();
    }
  }

  roulette() {
    const sum_fitness = sumator_fit(this._indiv);
    let new_individuals = this._indiv.map((indiv) => {
      let new_individual = indiv;
      new_individual.selection_probability = indiv.fitness / sum_fitness;
      return new_individual;
    })
    const individuals_choised = choice(
      events = new_individuals,
      size = this._size,
      probability = new_individuals.map(indiv => indiv.selection_probability)
      );
  
    return individuals_choised;
  }


  tournament() {
    let individuals_choised = []
    let j = 0;
    while( j < this._size ) {
      let b_id = -1;
      for (let i = 0; i < this._param; i++) {
        id = Math.floor(Math.random()*(len_individuals-1));
        if (b_id==-1 || this._indiv[b_id].fitness < this._indiv[id].fitness)
          b_id = id;
      }
      if(individuals_choised.indexOf(this._indiv[b_id])===-1) {
        individuals_choised.push(this._indiv[b_id]);
        j++;
      }
    }

    return individuals_choised;
  }

  lineal_rank() {
    let new_individuals = this._indiv.sort((a,b) => a.fitness - b.fitness);
    let mu = new_individuals.length;
    for (let i = 0; i < mu; i++) {
      new_individuals[i].selection_probability = ((2-this._param)/mu) + 2*i*((this._param-1)/(mu*(mu-1)));
    }
    const individuals_choised = choice(
      events = new_individuals,
      size = this._size,
      probability = new_individuals.map(indiv => indiv.selection_probability)
      );
    return individuals_choised;
  }

  uniform() {
    const sum_fitness = sumator_fit(this._indiv);
    let new_individuals = this._indiv.map((indiv) => {
      let new_individual = indiv;
      new_individual.selection_probability = 1 / sum_fitness;
      return new_individual;
    })

    const individuals_choised = choice(
      events = new_individuals,
      size = this._size,
      probability = new_individuals.map(indiv => indiv.selection_probability)
      );
  
    return individuals_choised;
  }

}


console.log(choice([1,5,10,2,4,6],4,[0.2,0.3,0.2,0.5,0.4,0.1]))