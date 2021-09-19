const router = require('express').Router();
const { Category, User, Plant, Location } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all Categories By User id

    const categoryData = await Category.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });

    const allCategories = categoryData.map((Category) =>
      Category.get({ plain: true })
    );
    // Pass serialized data and session flag into template

    res.render('category', {
      allCategories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:category_id/plants', withAuth, async (req, res) => {
  try {
    // Get the category data
    console.log('*********', req.session.user_id);
    console.log('********* category_id', req.params.category_id);

    const plantData = await Plant.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
      where: {
        owner_id: req.session.user_id,
        category_id: req.params.category_id,
      },
    });

    console.log('*********** plantdata', plantData);
    const plantsdetails = plantData.map((Plant) => Plant.get({ plain: true }));
    // Pass serialized data and session flag into template
    console.log('*********** plantsdetail', plantsdetails);
    console.log('********* plantsdetails.le', plantsdetails.length);

    //res.json(plantsdetails);

    res.render('displaycategory', {
      plantsdetails,
      category_id: req.params.category_id,
      logged_in: req.session.logged_in,
    });

    //res.json(plantsdetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the add category form page
router.get("/addcategory", withAuth, (req, res) => {
  res.render("addCategory");
});

router.post('/addcategory', withAuth, async (req, res) => {
  try {
    const newCategory = await Category.create({
      ...req.body,
      owner_id: req.session.user_id,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:category_id', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.category_id,
        owner_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
