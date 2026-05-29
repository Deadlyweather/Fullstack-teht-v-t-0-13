import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [votes, setVotes] = useState([1, 4, 6, 3])

  const [selected, setSelected] = useState(0)

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVotes = () => {
    let maxVotes = 0
    let maxIndex = 0
    votes.forEach((vote, index) => {
      if (vote > maxVotes) {
        maxVotes = vote
        maxIndex = index
      }
    })
    return { votes: maxVotes, index: maxIndex }
  }

  const Anti_NAN = () => {
    if (votes.length < anecdotes.length) {
      const newVotes = [...votes]
      while (newVotes.length < anecdotes.length) {
        newVotes.push(0)
      }
      setVotes(newVotes)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p><br />
      <button onClick={() => { Anti_NAN(); setSelected((selected + 1) % anecdotes.length); }}>Next anecdote</button>
      {console.log(`Index: ${selected}, Votes: ${votes[selected]}`)}
      
      
      <button onClick={handleVote}>Vote</button><br />
      
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes().index]}
      <p>has {mostVotes().votes} votes</p>
    </div>
  )
}

export default App
