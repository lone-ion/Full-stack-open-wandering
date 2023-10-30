const Persons = ({ persons, newFilter }) => {
  return (
    <div>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
          )
          .map((element) => (
            <li key={element.name}>
              {element.name} {element.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
