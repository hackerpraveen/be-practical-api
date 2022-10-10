const express = require("express");

const router = express.Router();

const JobPostController = require("../controller/JobPostController");

router.post('/insert',JobPostController.checkById,JobPostController.store);
router.get('/getAll',JobPostController.getAll);
router.post('/getById',JobPostController.getById);
router.post('/update',JobPostController.update);
router.post('/delete',JobPostController.remove);



module.exports = router;