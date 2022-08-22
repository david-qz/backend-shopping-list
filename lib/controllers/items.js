const { Router } = require('express');
const Item = require('../models/Item');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
