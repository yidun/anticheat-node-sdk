## 反作弊纯服务端 Node SDK

### 安装

`npm install yidun-anticheat-node-sdk --save`

### 使用

```js
const Checker = require('yidun-anticheat-node-sdk');

// type 可选值： 'login', 'register', 'activity', 分为对应登录保护，注册保护，营销反作弊
const checker = new Chcker('you type', {
  secretId: 'your secret id',
  secretKey: 'your secret key',
  businessId: 'your business id'
});

// 业务数据详见：http://support.dun.163.com/documents/15588071870066688?docId=150457664094261248
// 其中：ip, account,phone,runEnv,operatingTime 是必填字段
checker.check({
  ip: '',
  account: '',
  phone: '',
  runEnv: '',
  operatingTime: ''
}, (error, data) => {
  console.log(error, data);
});
```
