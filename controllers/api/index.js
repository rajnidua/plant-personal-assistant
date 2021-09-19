const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const categoryRoutes = require('./categoryRoutes');
const locationRoutes = require('./locationRoutes');
const frequencyRoutes = require('./frequencyRoutes');

router.use('/users', userRoutes);
router.use('/plant', plantRoutes);
router.use('/categories', categoryRoutes);
router.use('/locations', locationRoutes);
router.use('/frequency', frequencyRoutes);

module.exports = router;
