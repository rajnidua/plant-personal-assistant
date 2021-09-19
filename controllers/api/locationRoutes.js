const router = require('express').Router();
const { Category, User, Plant, Location } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all locations By User id

    const locationData = await Location.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });

    const allLocations = locationData.map((Location) =>
      Location.get({ plain: true })
    );
    // Pass serialized data and session flag into template

    res.render('location', {
      allLocations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addlocation', withAuth, async (req, res) => {
  try {
    const newLocation = await Location.create({
      ...req.body,
      owner_id: req.session.user_id,
    });

    res.status(200).json(newLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:location_id', withAuth, async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.location_id,
        owner_id: req.session.user_id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No Location found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/update/:location_id', withAuth, async (req, res) => {
  try {
    const updatedLocation = await Location.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.location_id,
          owner_id: req.session.user_id,
        },
      }
    );

    if (!updatedLocation) {
      res.status(400).json({ message: 'No Location found with this id!' });
      return;
    }

    res.status(200).json(updatedLocation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:location_id/plants', withAuth, async (req, res) => {
  try {
    // Get Plant records by Location

    const plantData = await Plant.findAll({
      include: [
        {
          model: Location,
          attributes: ['id', 'name'],
        },
      ],
      where: {
        owner_id: req.session.user_id,
        category_id: req.params.location_id,
      },
    });

    const plantsdetails = plantData.map((Plant) => Plant.get({ plain: true }));
    // Pass serialized data and session flag into template

    res.render('displaycategory', {
      ...plantsdetails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
