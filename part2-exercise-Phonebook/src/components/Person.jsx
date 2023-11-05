const Person = ({ name, phone, clickHandler }) => {
  const label = 'delete';

  return (
    <li>
      {name} {phone}
      <button onClick={clickHandler}>{label}</button>
    </li>
  );
};

export default Person;
