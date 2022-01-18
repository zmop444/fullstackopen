const Header = ({ text }) => (
    <h2>{text}</h2>
  )
  
  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
  const Content = ({ parts }) => (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <p><b>
        total of {parts.map(part => part.exercises).reduce((sum, n) => sum + n)} exercises
      </b></p>
    </div>
  )
  
  const Course = ({ course }) => (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )

  export default Course