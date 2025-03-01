const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/contacts-controller');


router.get('/contacts', getContacts);

module.exports = router;