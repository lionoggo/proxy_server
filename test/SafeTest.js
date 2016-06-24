var safe = require('../lib/SafeHandler');
var str = "Hello World! 你好，中国！";
var key = "1234567890";


var decrypt = safe.encrypt(str,key);
console.log("-->"+decrypt);

var encrypt = safe.decrypt(decrypt,key);
console.log("=="+encrypt);

