import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log(response.data)
     setPersons(response.data)
    })
  }, [])

  const addPerson = (event) =>
  {
    console.log(persons)
    event.preventDefault()
    console.log(persons.find((person)=> person.name === newName))
    if(persons.find((person)=> person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = [...persons, {name: newName, phoneNumber: newPhoneNumber, id:persons.length + 1 }]
    setPersons(newPersons)
    setNewName('')
    setNewPhoneNumber('')
  }
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) =>
  {
    setNewPhoneNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    event.target.value === '' ? setShowAll(true) : setShowAll(false)

    setFilterVal(event.target.value)
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} handleSearchChange={handleSearchChange}/>
      
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App