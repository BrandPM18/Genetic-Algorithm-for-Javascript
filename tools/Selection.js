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

class Selection_GA {

  constructor(_name, _indiv, _size=1, _param = 0, _presion = false) {
    this._name = _name;
    this._indiv = _indiv;
    this._size = _size;
    this._presion = _presion;
    this._param = _param;
  }
  
  execute() {
    switch (this._name) {
      case 'ruleta':                
        return this.roulette();
      case 'proporcional':
        return this.proportional();
      case 'ranking lineal':                
        return this.lineal_rank();
      case 'torneo':                
        return this.tournament();
      case 'uniforme':                
        return this.uniform();
      case 'muestreo estocastico':                
        return this.stochastic_sampling();
      case 'boltzman':                
        return this.boltzman();
      default: // ruleta
        return this.roulette();
    }
  }

  roulette() {
    const individuals_choised = choice(
      events = this._indiv,
      size = this._size,
      probability = this._indiv.map(indiv => indiv.selection_probability)
      );
    if (!this._presion) {
      return individuals_choised;
    } 
    
  }

  proportional() {

  }

  tournament() {}

  lineal_rank() {}

  stochastic_sampling() {}

  uniform() {}

  boltzman() {}
}


console.log(choice([1,5,10,2,4,6],4,[0.2,0.3,0.2,0.5,0.4,0.1]))