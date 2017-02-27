import React from 'react'
import petfinder from './petfinder-client'
import { ANIMALS } from './petfinder-client'
const pf = petfinder()

class SearchControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      breeds: []
    }

    this.handleBreedChange = this.handleBreedChange.bind(this)
    this.handleAnimalChange = this.handleAnimalChange.bind(this)
  }

  componentDidMount() {
    this.getNewBreeds(this.props.animal)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.animal && nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal)
    }
  }

  getNewBreeds(animal) {
    const promise = pf.breed.list({animal})

    promise.then((data) => {
      if(data.petfinder.breeds) {
        this.setState({breeds: data.petfinder.breeds.breed})
      }
    })
  }

  handleBreedChange(event) {
    this.props.changeBreed(event.target.value)
  }

  handleAnimalChange(event) {
    this.props.changeAnimal(event.target.value)
  }

  render() {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        // Map with the parens instead of curly means an implicit return
        {this.state.breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    )

    return(
      <div classname='search'>
        <select value={this.props.animal} onChange={this.handleAnimalChange}>
          <option value=''></option>
          // Map with the parens instead of curly means an implicit return
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>{animal}</option>
          ))}
        </select>
        {breedSelector}
      </div>
    )
  }
}

export default SearchControls
