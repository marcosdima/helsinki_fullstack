import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, ExerciseParams } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) return res.status(400).send({
    error: "parameters missing"
  });

  const targetNum = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const dairyExercise: Array<number> = Array<number>(...daily_exercises);

  if (isNaN(targetNum) || !dairyExercise) return res.status(400).send({
    error: "malformatted parameters"
  });
  
  const params: ExerciseParams = {
    dairyExercise, 
    target: targetNum
  };

  const result = calculateExercises(params);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

