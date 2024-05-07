import express from 'express';
import { getPatients } from '../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getPatients());
});

export default router;