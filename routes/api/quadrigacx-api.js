require('dotenv').config();
const { KEY, CLIENTID, SECRET } = process.env;

const express = require('express');
const apiRouter = express.Router();
const QuadrigaCX = require('../../libs/quadrigacx-helpers');
const quadrigacx = new QuadrigaCX(CLIENTID, KEY, SECRET);

apiRouter.get('/current-trading', (req, res) => {
  quadrigacx.api('ticker', { book: 'btc_cad' }, function (err, result) {
    res.json(result);
  });
})

// apiRouter.get('/balance', (req, res) => {
//   quadrigacx.api('balance', {}, function (err, order) {
//     console.log(err, order);
//     res.json(order);
//   });
// })

module.exports = apiRouter;