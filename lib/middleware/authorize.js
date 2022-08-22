const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    // Get item id that's being accessed from request params
    const itemId = req.params.id;
    // Fetch the item
    const item = await Item.getById(itemId);

    // Make sure the current user owns this item
    if (item.user_id !== req.user.id) {
      throw new Error('unauthorized');
    }

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
