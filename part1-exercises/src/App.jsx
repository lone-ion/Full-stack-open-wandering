const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.hours}
      </p>
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part name={props.lesson[0]} hours={props.exercise[0]} />
      <Part name={props.lesson[1]} hours={props.exercise[1]} />
      <Part name={props.lesson[2]} hours={props.exercise[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.hours}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercise1 = 10;
  const part2 = "Using props to pass data";
  const exercise2 = 7;
  const part3 = "State of a component";
  const exercise3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        lesson={[part1, part2, part3]}
        exercise={[exercise1, exercise2, exercise3]}
      />
      <Total hours={exercise1 + exercise2 + exercise3} />
    </div>
  );
};

export default App;
