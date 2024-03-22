import { useState } from 'react'

const StatisticLine = ({ text, count }) => {
  return (
    <tr>
      <td>
        {text}
      </td> 
      <td>
        {count}
      </td>
    </tr>
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
    <tr>
      <td>
        average
      </td>
      <td>
        {avr}
      </td>
    </tr>
  )
}

const Percentage = ({ reviews, target }) => {
  let total = 0;
  for (let k in reviews) total += reviews[k];

  let percentage = 0
  // Prevents division by zero...
  if (total > 0) percentage = (reviews[target] * 100) / total;
  
  return (
    <tr>
      <td>
        {target}
      </td> 
      <td>
        {percentage} %
      </td>
    </tr>
  )
}

const Statistics = ({ values }) => {
  const { good, neutral, bad } = values;

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

  // Check if there is any feedback...
  if (total == 0) return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  );

  // Object to percentage component...
  const reviews = {
      positive: good,
      negative: bad,
      neutral: neutral
  }
  const percentageTarget = 'positive'

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={goodText} count={good} />
          <StatisticLine text={neutralText} count={neutral} />   
          <StatisticLine text={badText} count={bad} />   
          <StatisticLine text={allText} count={total} />
          <Average values={[bad * badValue, good * goodValue, neutral * neutralValue]} total={total} />
          <Percentage target={percentageTarget} reviews={reviews} />
        </tbody>
      </table>
    </>
  );
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

  const handleGoodReview = () => {
    setGood(good + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }

  const values = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text={goodText} handler={handleGoodReview} />
      <Button text={neutralText} handler={handleNeutralReview} />
      <Button text={badText} handler={handleBadReview} />
      <Statistics values={values}/>
    </>
  )
}

export default App