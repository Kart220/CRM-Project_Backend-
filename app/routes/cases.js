const express = require('express');
const {
    getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase
} = require('../controllers/casecontroller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getCases)
    .post(createCase);

router.route('/:id')
    .get(getCase)
    .put(updateCase)
    .delete(deleteCase);

module.exports = router;