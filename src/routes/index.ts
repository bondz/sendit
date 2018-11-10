import Router from 'express';

const router = Router();

router.get('/', function(_req, res) {
  res.status(200).json({ status: 300, data: 'Server is live' });
});

export default router;
