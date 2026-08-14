const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const List = props.parts.map(part => part.exercises)

  console.log(List)
  return (
    <div>
      <p>Total exercises {List.reduce((sum, exercises) => sum + exercises, 0)}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header course={courses[0]} />
      <Content parts={courses[0].parts} />
      <Total parts={courses[0].parts} />
      <Header course={courses[1]} />
      <Content parts={courses[1].parts} />
      <Total parts={courses[1].parts} />
    </div>
  )
}

export default App