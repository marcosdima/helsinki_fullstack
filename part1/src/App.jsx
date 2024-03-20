const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part label={props.labels[0]} number={props.numbers[0]} ></Part>
      <Part label={props.labels[1]} number={props.numbers[1]} ></Part>
      <Part label={props.labels[2]} number={props.numbers[2]} ></Part>
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
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header header={course} ></Header>
      <Content 
        labels={[part1, part2, part3]} 
        numbers={[exercises1, exercises2, exercises3]}
        />
      <Total total={exercises1 + exercises2 + exercises3} ></Total>
    </div>
  )
}

export default App