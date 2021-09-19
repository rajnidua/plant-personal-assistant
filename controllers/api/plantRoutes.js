const router = require('express').Router();
const { Plant, Location, Category } = require('../../models');

router.get('/:category_id/addPlant', async (req, res) => {
  try {
    console.log('********* add plant i am in');

    const locationData = await Location.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });

    const allLocations = locationData.map((Location) =>
      Location.get({ plain: true })
    );
    console.log('******** location stuff', allLocations);
    res.render('addPlant', {
      category_id: req.params.category_id,
      allLocations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/addPlant', async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      owner_id: req.session.user_id,
    });

    //res.status(200);
    res.status(200).json(newPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:plant_id', async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.plant_id,
        owner_id: req.session.owner_id,
      },
    });
  } catch (err) {
    console.log('****** ERROR', err);
    res.status(400).json(err);
  }
});

router.get('/:plant_id', async (req, res) => {
  try {
    console.log('!!!!!!!' + req.params.plant_id);
    const plantData = await Plant.findByPk(req.params.plant_id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },

        {
          model: Location,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }
    console.log('**********' + plantData);
    const plantInfo = plantData.get({ plain: true });
    console.log('&&&&&&&&&&&&&&&' + plantInfo);
    // const plantInfo = plantData.map((Plant) => Plant.get({ plain: true }));
    //res.status(200).json(plantInfo);
    res.render('viewPlant', {
      plantInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/update/:plant_id', async (req, res) => {
  try {
    const updatedPlant = await Plant.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.plant_id,
          owner_id: req.session.user_id,
        },
      }
    );

    if (!updatedPlant) {
      res
        .status(404)
        .json({ message: 'No plant details were found with this id!' });
      return;
    }

    res.status(200).json(updatedPlant);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
