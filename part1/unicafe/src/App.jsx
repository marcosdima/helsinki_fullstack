import { useState } from 'react'

const Display = ({ text, count }) => {
  return (
    <p>
      {text} {count}
    </p>
  )
}

const Button = ({ text, handler }) => {
  return (
    <button onClick={handler} >{text}</button>
  )
}

const Average = ({ values, total }) => {
  let sum = 0;
  for (let value of values) sum += value;

  let avr = 0;
  // Prevents division by zero...
  if (total > 0) avr = sum / total;

  return (
    <>
      <p>average {avr}</p>
    </>
  )
}

const Percentage = ({ reviews, target }) => {
  let total = 0;
  for (let k in reviews) total += reviews[k];

  let percentage = 0
  // Prevents division by zero...
  if (total > 0) percentage = (reviews[target] * 100) / total;
  
  return (
    <p>{target} {percentage}%</p>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Text variables...
  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'
  const allText = 'all'

  // Integer variables...
  const goodValue = 1
  const badValue = -1
  const neutralValue = 0
  const total = bad + good + neutral

  // Object to percentage component...
  const reviews = {
    positive: good,
    negative: bad,
    neutral: neutral
  }
  const percentageTarget = 'positive'

  const handleGoodReview = () => {
    setGood(good + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text={goodText} handler={handleGoodReview} />
      <Button text={neutralText} handler={handleNeutralReview} />
      <Button text={badText} handler={handleBadReview} />
      <h1>statistics</h1>
      <Display text={goodText} count={good} />
      <Display text={neutralText} count={neutral} />
      <Display text={badText} count={bad} />
      <Display text={allText} count={total} />
      <Average values={[bad * badValue, good * goodValue, neutral * neutralValue]} total={total} />
      <Percentage target={percentageTarget} reviews={reviews} />
    </>
  )
}

export default App