'use strict';

const https = require('https');
const urluitl =require('url');
const qs = require('querystring');
const crypto = require('crypto');

exports.genNoncer = function (length = 6) {
  return Array(length)
    .fill(0)
    .map(i => Math.floor(Math.random() * 10))
    .join('');
};

exports.genSignature = function (secretKey, params) {
  const md5er = crypto.createHash('md5');
  let needSignatureStr = Object.keys(params)
    .sort()
    .reduce((result, key) => result + key + params[key], '');

  needSignatureStr += secretKey;
	md5er.update(needSignatureStr, 'UTF-8');
  return md5er.digest('hex');
};

exports.request = function ({ url, method = 'POST', data }, callback) {
  const content  = qs.stringify(data);
  const { protocol, host, path, port } = urluitl.parse(url);
  const options = {
    protocol,
    host,
    port,
    path,
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': Buffer.byteLength(content)
    },
    rejectUnauthorized: false
  }
  let result = '';
	const req = https.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', chunk => result += chunk);
		res.on('end', () => callback(null, result));
		req.on('error', error => callback(error, null));
  });
  req.on('error', error => callback(error, null));
	req.write(content);
	req.end();
};
