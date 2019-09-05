'use strict';

const crypto = require('crypto');

const md5 = data => {
  const md5er = crypto.createHash('md5');
  md5er.update(data, 'UTF-8');
  return md5er.digest('hex');
};

const AnticheatChecker = require('./index')

const checker = new AnticheatChecker('login', {
  secretId: '',
  secretKey: '',
  businessId: ''
});

checker.check({
  ip: 'x',
  account: md5('x'),
  phone: md5('x'),
  runEnv: 2,
  operatingTime: parseInt(Date.now() / 1000, 10)
}, (error, data) => {
  console.log(error, data);
});
