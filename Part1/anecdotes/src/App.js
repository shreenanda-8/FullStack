import React, { useState } from 'react'
const DisplayMostVoted = ({list, maxInd, anecdotes})=>{
   if(maxInd !== null)
   {
     return(
         <>
         <h1>Anecdote with most votes</h1>
          <p>{anecdotes[maxInd]}</p>
          <p>Has {list[maxInd]} votes</p>
         </>
     )
   }
   else{
       return<></>
   }
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [votes, setVotes] = useState(new Array(7).fill(0))
  const [maxVoteInd, setMaxVoteInd] = useState(null)
  const [maxVote, setMaxVote] = useState(0)
  const [selected, setSelected] = useState(0)
  const getRandom = ()=>{
    return Math.floor((Math.random() * 7) )
  }
  const handleClick = ()=>{
      var random = getRandom()
      setSelected(random)
  }
  const handleVotes = ()=>{
    var voteList = [...votes]
    voteList[selected]++
    if(maxVote < voteList[selected])
    {
         
        setMaxVote(voteList[selected])
        setMaxVoteInd(selected)
    }
   
    setVotes(voteList)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p> {anecdotes[selected]}</p>
      
      <p>Has {votes[selected]} votes</p>
      <button onClick = {handleVotes}>vote</button>
      <button onClick = {handleClick}>next anecdote</button>
      <br/>
    
      <DisplayMostVoted anecdotes = {anecdotes} list = {votes} maxInd = {maxVoteInd}/>

   
    </div>
  )
}

export default App