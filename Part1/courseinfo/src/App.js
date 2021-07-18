import React from 'react'
const Part = ({name,exercise})=>{
    return (
        <p>{name} {exercise}</p>
    )
}
const Content = ({course})=>{
   const names = course.parts.map((info)=>{
       return info.part
   })
   const exercise = course.parts.map((info)=>{
       return info.exercise
   })
   const [name1, name2, name3] = names
   const [ex1,ex2,ex3] = exercise
   return(
       <>
        <Part name= {name1} exercise = {ex1}/>
        <Part name = {name2} exercise = {ex2}/>
        <Part name = {name3} exercise = {ex3}/>
        </>
   )

}
const Total = ({course})=>{
    
    const sum = course.parts.reduce((accumulator,info)=>{
        return accumulator + info.exercise 
    },0)
    return( 
    <p>Number of exercises {sum}</p> 
    )
}
const Header = ({name})=>{
    return(
        <h1>{name}</h1>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts:
         [
          {
            part: 'Fundamentals of React',
            exercise: 10
          },
          {
            part: 'Using props to pass data',
            exercise: 7
          },
          {
            part: 'State of a component',
            exercise: 14
          }
        ]
      }
  
    return (
      <div>
       
        <Header name = {course.name}/>
        <Content course = {course}/>
       
        <Total course = {course}/>
      </div>
    )
  }
  
  export default App