/* eslint-disable no-unused-vars */
import React from 'react'
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts}></Total>
          
        </div>
      )
}

export default Course