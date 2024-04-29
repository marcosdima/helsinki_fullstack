import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  // Check if the parameters are right...
  if (isNaN(height) || isNaN(weight)) res.status(400).send({
    error: "malformatted parameters"
  });

  res.json({
    height,
    weight,
    bmi: calculateBmi({ height, mass: weight })
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});