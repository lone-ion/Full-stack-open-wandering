import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Form from './components/Form';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const names = persons.map((person) => person.name);
    const exists = names.indexOf(newName);
    if (exists === -1) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook,replace the old number with a new one?`
        )
      );
      const matchedNameaArrIndex = exists;
      const objId = persons[matchedNameaArrIndex].id;
      const changedPersonObject = { ...personObject, number: newNumber };
      personService
        .update(objId, changedPersonObject)
        .then((returnedPerson) => {
          setPersons(
            persons.filter((obj) => obj.id !== objId).concat(returnedPerson)
          );
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = () => {
    setFilter(event.target.value);
  };

  const handlePersonDeletion = (id, name) => {
    if (window.confirm(`Delete entry ${name}?`)) {
      personService.remove(id);
      setPersons(persons.filter((obj) => obj.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        sharePersonDetails={handlePersonDeletion}
      />
    </div>
  );
};

export default App;
