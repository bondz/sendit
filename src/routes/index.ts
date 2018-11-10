import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ status: 300, data: 'Server is live' });
});

export default router;
