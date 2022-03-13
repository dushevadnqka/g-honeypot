const express = require('express');
const router = express.Router();


const timeoutPeriod = 5000
const responseMsg = "Not Found\n"


/* GET home page. */
router.get('/*', async (req, res) => {
  res.useChunkedEncodingByDefault

  res.write(responseMsg);

  setInterval( async () => { 
    res.write(responseMsg);
  }, timeoutPeriod);
});

module.exports = router;
