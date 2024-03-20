const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part label={props.parts[0].name} number={props.parts[0].exercises} ></Part>
      <Part label={props.parts[1].name} number={props.parts[1].exercises} ></Part>
      <Part label={props.parts[2].name} number={props.parts[2].exercises} ></Part>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.label} {props.number}
    </p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((total, obj) => total + obj.exercises, 0);

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header header={course.name} ></Header>
      <Content 
        parts={course.parts}
        />
      <Total parts={course.parts} ></Total>
    </div>
  )
}

export default App