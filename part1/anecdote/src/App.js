import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [pts, setPts] = useState({})
  const [topAnecdote, setTopAnecdote] = useState(0)
  const newRandomSelected = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  let topAnecdotePts = pts[topAnecdote] ?? 0
  let selectedPts = pts[selected] ?? 0
  const incrementPt = () => {
    selectedPts++;
    const newPts = {...pts}
    newPts[selected] = selectedPts;
    setPts(newPts)
    if(selectedPts > topAnecdotePts) {
      setTopAnecdote(selected)
    }
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {selectedPts} votes</p>
        <button onClick={incrementPt}>vote</button>
        <button onClick={newRandomSelected}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[topAnecdote]}</p>
        <p>has {topAnecdotePts} votes</p>
      </div>
    </div>
  )
}

export default App