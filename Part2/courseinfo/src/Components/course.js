import React from 'react'
const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}
const Part = ({ name, exercise }) => {
    return (<p >{name} {exercise}</p>)
}
const Content = ({ course }) => {
    const list = course.parts.map((info, i) =>
        <Part key={i} name={info.name} exercise={info.exercises} />)
    return (
        <div>
            {list}
        </div>
    )
}
const Total = ({ course }) => {
    const sum = course.parts.reduce((accumulate, info) => {
        return accumulate + info.exercises
    }, 0)
    return (
        <p>Total of {sum} exercises</p>
    )
}
const Course = ({ course }) => {

    const list = course.map((course, index) => {
        return (
            <div key={index}>
                <Header course={course} />
                <Content course={course} />
                <Total course={course} />
            </div>
        )
    })
    return list

}
export default Course