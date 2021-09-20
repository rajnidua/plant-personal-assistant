const router = require('express').Router();
const { Category, User, Plant, Location } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all Plants By User id and sorted by next watering date

    const plantWaterDate = await Plant.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
        {
          model: User,
          attributes: ['id', 'fname'],
        },
      ],
      where: {
        owner_id: req.session.user_id,
      },
     
      order: [
            ['next_watering_date', 'ASC'],
            
        ],
    });

    const allplantWaterDates = plantWaterDate.map((Plant) =>
      Plant.get({ plain: true })
    );

    const userName = allplantWaterDates[0].user.fname;
console.log(allplantWaterDates);


    //res.json(allplantWaterDates);
    // Pass serialized data and session flag into template

     res.render('schedule', {
      allplantWaterDates,
      userName,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
