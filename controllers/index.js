const router = require('express').Router();

const apiRoutes = require('./api');
const searchRoutes = require('./searchRoutes');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');


router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);


module.exports = router;