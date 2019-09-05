'use strict';

const crypto = require('crypto');

const md5 = data => {
  const md5er = crypto.createHash('md5');
  md5er.update(data, 'UTF-8');
  return md5er.digest('hex');
};

const AnticheatChecker = require('./index')

const checker = new AnticheatChecker('activity', {
  secretId: 'your secret id',
  secretKey: 'your secret key',
  businessId: 'your business id'
});

checker.check({
  ip: 'user ip',
  account: md5('user account'),
  phone: md5('user phone'),
  runEnv: 2,
  operatingTime: parseInt(Date.now() / 1000, 10)
}, (error, data) => {
  console.log(error, data);
});
