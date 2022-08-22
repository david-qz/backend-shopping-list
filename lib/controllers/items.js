const { Router } = require('express');
const Item = require('../models/Item');

const authorize = require('../middleware/authorize');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await Item.insert({ ...req.body, user_id: req.user.id });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize, async (req, res, next) => {
  try {
    const item = await Item.updateById(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize, async (req, res, next) => {
  try {
    const item = await Item.delete(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
