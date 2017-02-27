import React from 'react';
import credentials from './credentials'
import petfinder from './petfinder-client'
import Pet from './Pet'
import SearchControls from './SearchControls'
const pf = petfinder(credentials)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animal: 'dog',
      breed: 'Mastiff',
      location: 'St Petersburg, FL',
      pets: []
    }

    this.changeBreed = this.changeBreed.bind(this)
  }

  componentDidMount() {
    this.search()
  }

  search() {
    // This pulls the variable off state and assigns it.
    // Equivalent to:
    // const animal = this.state.animal
    const { animal, breed, location } = this.state
    // This is ES6 and converts it to animal: animal
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    // Error function does not create a new context.
    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({pets})
    })
  }

  changeBreed(breed) {
    this.setState({breed})
  }

  render() {
    return(
      <div className='app'>
        <img src='adopt-me.png' alt='adopt-me logo' />
        <SearchControls
          breed={this.state.breed}
          animal ={this.state.animal}
          changeBreed={this.changeBreed}
        />
        <div>
          {this.state.pets.map((pet) => {
            return (
              <Pet key={pet.id} pet={pet} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
