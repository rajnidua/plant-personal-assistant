const router = require('express').Router();
const { Plant } = require('../../models');

router.post('/:plant_id', async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      owner_id: req.session.user_id,
    });

    res.status(200).json(newPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
