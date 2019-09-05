'use strict';

const _ = require('./uitl');

const API_URL = {
  activity: 'https://ac.dun.163yun.com/pureserver/activity/check',
  register: 'https://ac.dun.163yun.com/pureserver/register/check',
  login: 'https://ac.dun.163yun.com/pureserver/register/login'
}

class AnticheatChecker {
  constructor (type, options) {
    this.$options = options;
    this.$type = ['login', 'register', 'activity'].includes(type) ? type : 'login';
  }
  check (data = {}, callback) {
    const { secretId, secretKey, businessId, version = '200' } = this.$options;
    const timestamp = parseInt(Date.now() / 1000, 10);
    let params = Object.assign(data, {
      secretId,
      businessId,
      version,
      timestamp,
      nonce: _.genNoncer()
    });
    params.signature = _.genSignature(secretKey, params);
    _.request({ url: API_URL[this.$type], data: params }, (error, result) => {
      if (error) return callback(error, null);
      try {
        callback(null, JSON.parse(result));
      } catch (error) {
        callback(error, null);
      }
    });
  }
}

module.exports = AnticheatChecker;
