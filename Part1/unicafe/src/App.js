import React, { useState } from 'react'

const Button = ({text, handleClick})=>{
return(
    <button onClick = {handleClick}>{text}</button>
)
}
const Statistic = (props)=>{
    return(
        
        <td>{props.text} {props.value}</td>
        
    )
}
const Statistics = ({good, neutral, bad, all, average, positive})=>{
  
      if(good === 0 && neutral === 0 && bad === 0)
      {
          return(
            <p>No feedback given</p>
          )
      }
     else{
       return(
          <table>
             <tbody>
             
        <tr><Statistic text = "good" value = {good}/></tr>
        <tr><Statistic text = "neutral" value = {neutral}/></tr>
        <tr><Statistic text = "bad" value = {bad}/></tr>
        <tr><Statistic text = "all" value = {all}/></tr>

        <tr><Statistic text = "average" value = {average}/></tr>
        <tr><Statistic text = "positive" value = {positive + "%"}/></tr>
   
             </tbody>
          </table>
       )
     }
  
}
const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const addResponse = (text)=>{
      if(text === "good")
      {
          setGood(good + 1)
      }
      else if(text === "bad")
      {
          setBad(bad + 1)
      }
      else if(text === "neutral")
      {
          setNeutral(neutral + 1)
      }
  }
  const all = good + bad + neutral
  const average = ((good - bad) / all) 
  const pos = (good / all) * 100
  return (
    <div>
      <h1>give feedback</h1>
      <br/>
     <Button text = "good" handleClick = {()=>addResponse("good")}/>
     <Button text = "neutral" handleClick = {()=>addResponse("neutral")}/>
     <Button text = "bad" handleClick = {()=>addResponse("bad")}/>
     <h2>Statistics</h2>
      <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all} positive = {pos} average = {average}/>
    </div>
  )
}

export default App