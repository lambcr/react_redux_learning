import React from 'react';
import credentials from './credentials'
import petfinder from './petfinder-client'
const pf = petfinder(credentials)

class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        animal: 'dog',
        breed: 'Boxer',
        location: 'St Petersburg, FL',
        pets: []
      }
  }

  componentDidMount() {
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

  render() {
    return(
      <div className='app'>
        <img src='images/adopt-me.png' alt='adopt-me logo' />
        <div>
          <pre><code>
            {JSON.stringify(this.state, null, 4)}
          </code></pre>
        </div>
      </div>
    )
  }
}

export default App
