import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [showAll, setShowAll] = useState(true)

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