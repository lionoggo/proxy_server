var xxtea = require('xxtea-node');

function encrypt(data,key) {
    return new Buffer(xxtea.encrypt(xxtea.toBytes(data), xxtea.toBytes(key))).toString('base64');
}

function decrypt(data,key){
    return xxtea.toString(xxtea.decrypt(data, xxtea.toBytes(key)));
}


module.exports.encrypt=encrypt;
module.exports.decrypt=decrypt;



