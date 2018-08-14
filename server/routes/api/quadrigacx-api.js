require('dotenv').config();
const { KEY, CLIENTID, SECRET } = process.env;

const express = require('express');
const apiRouter = express.Router();
const QuadrigaCX = require('../../../libs/quadrigacx-helpers');
const quadrigacx = new QuadrigaCX(CLIENTID, KEY, SECRET);

apiRouter.get('/current-trades/:orderBookId', (req, res) => {
  const book = req.params.orderBookId;
  quadrigacx.api('ticker', { book }, function (err, tradeResult) {
    res.json({ book, tradeResult });
  });
})

apiRouter.get('/transactions/:orderBookId', (req, res) => {
  const book = req.params.orderBookId;
  quadrigacx.api('transactions', { book }, (err, transResult) => {
    res.json({ book, transResult });
  })
})


module.exports = apiRouter;