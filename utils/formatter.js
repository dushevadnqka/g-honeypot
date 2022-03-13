const formatHeaders = (headers, indent) => {
	if (typeof headers !== 'object' || headers.length === 0) return;
	indent = indent ? indent : '';
	let s = '';
	for (let key in headers) {
		let val = headers[key];
		if (typeof val === 'object' && val !== null) {
			s+= key + ':\r\n';
			s+= formatHeaders(val, indent + " - ");
		}
		else s+= indent + key + ': ' + val + '\r\n';
	}

	return s;
};

const formatIpAddress = (address) => {
	if (address.length !== 0 && address.substr(0, 7) === "::ffff:") return address.substr(7);

	return address;
};

module.exports = {
	formatHeaders: formatHeaders,
	formatIpAddress: formatIpAddress,
};
