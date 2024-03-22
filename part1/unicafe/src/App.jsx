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

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

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
    </>
  )
}

export default App