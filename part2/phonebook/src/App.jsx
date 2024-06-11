/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'
const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState({message:null, isError: false})

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)})
  }, [])

  const addPerson = (event) =>
  {
    //console.log(persons)
    event.preventDefault()
    //console.log(persons.find((person)=> person.name === newName))
    const existingPerson = persons.find((person)=> person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    if(existingPerson)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {id : existingPerson.id, name : existingPerson.name, phoneNumber : newPhoneNumber}
        personService
        .update(existingPerson.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setNotificationMessage({message: `Updated ${existingPerson.name}`, isError: false})
          setTimeout(() => {
            setNotificationMessage({message:null, isError: false})
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
           {message: `Information of '${existingPerson.name}' has already been removed from server`, isError:true}
          )
          setNewName('')
          setNewPhoneNumber('')
          setTimeout(() => {
            setNotificationMessage({message:null, isError: false})
          }, 5000)

        })
      }
      else{
        setNewName('')
        setNewPhoneNumber('')
      }
      return
    }
    const newPersons = {name: newName, phoneNumber: newPhoneNumber}
    personService.create(newPersons).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhoneNumber('')
      setNotificationMessage({message: `Added ${returnedPerson.name}`, isError: false})
      setTimeout(() => {
        setNotificationMessage({message:null, isError: false})
      }, 5000)
    })
  }
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(persons => persons.id === id).name}`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter(persons => persons.id !== returnedPerson.id))
        console.log(returnedPerson)})
    }
    
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
      <Notification notification={notificationMessage}  />
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
      <Persons personsToShow={personsToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App