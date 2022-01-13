import React, { useState } from "react";

const Button = ({ onclick, text }) => (
  <button onClick={onclick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ statistics }) => {
  if (statistics.all == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={statistics.good} />
          <StatisticLine text="neutral" value={statistics.neutral} />
          <StatisticLine text="bad" value={statistics.bad} />
          <StatisticLine text="all" value={statistics.all} />
          <StatisticLine text="average" value={statistics.average} />
          <StatisticLine text="positive" value={statistics.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setIncremented = (n, fn) => fn(n + 1)
  const all = good + neutral + bad
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: (good - bad) / all,
    positive: (good / all * 100) + ' %'
  }

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text="good" onclick={() => setIncremented(good, setGood)} />
        <Button text="neutral" onclick={() => setIncremented(neutral, setNeutral)} />
        <Button text="bad" onclick={() => setIncremented(bad, setBad)} />
      </div>
      <Statistics statistics={statistics} />
    </div>
  )
}


export default App;
