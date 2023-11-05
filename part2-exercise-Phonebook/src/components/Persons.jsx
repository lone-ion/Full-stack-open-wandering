import Person from './Person';

const Persons = ({ persons, filter, sharePersonDetails }) => {
  return (
    <div>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((element) => (
            <Person
              key={element.name}
              name={element.name}
              phone={element.number}
              clickHandler={() => sharePersonDetails(element.id, element.name)}
            />
          ))}
      </ul>
    </div>
  );
};

export default Persons;
