/* eslint-disable react/prop-types */
import { useState } from 'react'


const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
  )
}


const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  const avg = (props.good - props.bad) / (all)
  const pos = (props.good / all)
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={avg} />
        <StatisticLine text="positive" value ={pos + ' %'} />
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGood = () =>{
    const newGood = good + 1
    setGood(newGood)
  }
  const onNeutral = () =>{
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const onBad = () =>{
    const newBad = bad + 1
    setBad(newBad)
  }

  if((good + bad + neutral) === 0)
  {
    return(
      <div>
        <h1>give feedback</h1>
        <Button onClick={onGood} text='good'/>
        <Button onClick={onNeutral} text='neutral'/>
        <Button onClick={onBad} text='bad'/>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onGood} text='good'/>
      <Button onClick={onNeutral} text='neutral'/>
      <Button onClick={onBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} ></Statistics>
    </div>
  )
}

export default App