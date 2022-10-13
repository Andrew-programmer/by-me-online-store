const Router = require('express');
const ratingController = require('../controllers/ratingController');
const authMid = require("../middleware/authMiddleware");

const router = new Router();

router.post('/', authMid, ratingController.create);
router.get('/', authMid, ratingController.getOne);
router.put('/', authMid, ratingController.update);
router.delete('/', authMid, ratingController.delete);




module.exports = router;
