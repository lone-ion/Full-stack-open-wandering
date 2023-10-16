const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content lesson={parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        <li>
          {props.name} {props.exercises}
        </li>
      </p>
    </div>
  );
};

const Content = ({ lesson }) => {
  return (
    <div>
      <ul>
        {lesson.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
        <li>
          total of {lesson.reduce((a, b) => a + b.exercises, 0)} exercises{" "}
        </li>
      </ul>
    </div>
  );
};

export default Course;
