const express = require('express');
const router = express.Router();
const formatter = require('../utils/formatter')
const dbOps = require('../utils/dbOps')


const timeoutPeriod = 5000
const dbExpirationPeriod = 10000 // otherwise the 
const responseMsg = "Not Found\n"


/* GET home page. */
router.get('/*', async (req, res) => {
  // log the activity to the db (might be a legal issue due to ip is kinda personal data GDPR)
  // but is needed to define some suspicious activity
  let item = {
		'ip': formatter.formatIpAddress(req.ip),
		'service': req.protocol,
		'request': req.method + ' ' + req.originalUrl,
		'request_headers': formatter.formatHeaders(req.headers)
	};

  dbOps.saveToDB(item);

  // prepare response
  res.useChunkedEncodingByDefault

  res.write(responseMsg);

  setInterval( async () => { 
    res.write(responseMsg);
  }, timeoutPeriod);
});

module.exports = router;
