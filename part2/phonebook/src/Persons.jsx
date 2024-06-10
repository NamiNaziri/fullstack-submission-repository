/* eslint-disable react/prop-types */

const Persons = ({ personsToShow, deleteHandler }) => {
    return (
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.phoneNumber} 
            <button onClick={()=>deleteHandler(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;