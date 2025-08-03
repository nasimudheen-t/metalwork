const express = require('express');
const router = express.Router();


const { createRate, getLatestRate, getRateHistory,getAllpurity ,purityUpdate , getPurityById , purityDelete, serachPurity } = require('../controllers/rateController');




router.get('/get-purity', getAllpurity);



router.delete('/delete/:id', purityDelete);

router.get('/purity/:id',getPurityById)

router.post('/create-purity', createRate);

router.put('/update-purity/:id',purityUpdate)



router.get('/rate-history', getRateHistory);

router.get('/latest-rate',getLatestRate)


module.exports = router;