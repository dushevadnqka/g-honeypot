// db operations
const mysqlPool = require("./mysqlPool").default

/**
 * Saves data in the MySQL database
 * @param item
 */
 const saveToDB = async (item) => {
	//  sample data set which could be saved for some analysis work
	let request = {
		'ip': item.ip,
		'service': item.service,
		'request': item.request,
		'request_headers': item.request_headers
	};

	mysqlPool.getConnection((err, connection) => {
        if (err) return;
		if (!connection) return;
		connection.query('INSERT INTO request SET ?', request, (error) => {
			connection.release();
			if (error) throw error;
		});
	});
};

const truncateTable = async () => {
	mysqlPool.getConnection((err, connection) => {
        if (err) return;
		if (!connection) return;
		connection.query('TRUNCATE TABLE request', (error) => {
			connection.release();
			if (error) throw error;
		});
	});
}

module.exports = {
	saveToDB: saveToDB,
	truncateTable: truncateTable,
};
