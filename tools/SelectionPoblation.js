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

  constructor(_name, _indiv,aux_selection, _size=1, _param = 1) {
    this._name = _name;
    this._indiv = _indiv;
    this._aux_selection = aux_selection;
    this._size = _size;
    this._param = _param;
  }

  execute() {
    switch (this._name) {
      case 'truncamiento':
        return this.truncation();
      case 'elitista':
        return this.elite();  
      case 'boltzman':
        return this.boltzman();
      default: 
        return this.truncation();
    }
  }

  truncation() {
    let sort_individuals = this._indiv.sort((a,b) => a.fitness - b.fitness); // menor a mayor
    let new_individuals = sort_individuals.slice(this._size-1);
    return new_individuals;
  }

  elite() {
    let sort_individuals = this._indiv.sort((a,b) => a.fitness - b.fitness); // menor a mayor
    return this._aux_selection(sort_individuals);
  }

  boltzman() {
    let individuals_choised = [];
    let copy_indiv = this._indiv;
    while (individuals_choised.length < this._size) {
      const index_candidates  = samples_array(copy_indiv.length,2);
      let p = 1/(1+ Math.exp(
        (copy_indiv[index_candidates[0]].fitness - copy_indiv[index_candidates[1]].fitness)/this._param
      ));
      if (Math.random() <= p) {
        individuals_choised.push(copy_indiv[index_candidates[0]]);
        copy_indiv.splice(index_candidates[0],1);;
      } else {
        individuals_choised.push(copy_indiv[index_candidates[1]]);
        copy_indiv.splice(index_candidates[1],1);;
      }
    }
    return individuals_choised;
  }
}
