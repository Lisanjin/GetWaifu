// 引入 CryptoJS 库和文件系统模块
// const CryptoJS = require('./crypto-js.js');

// 定义 _decrypt 函数
function _decrypt(data) {
    console.log("开始解密数据");
    const assetPass = '#mnsg';
    const manifestPass = '#manifest';
    const ivKey = 'BFA4332ECFDCB3D1DA2633B5AB509094';

    const hash = CryptoJS.SHA256(assetPass + manifestPass);
    const key = CryptoJS.enc.Base64.stringify(hash).substr(0, 32);

    const options = { iv: ivKey, mode: CryptoJS.mode.CTR };
    const dec = CryptoJS.AES.decrypt(data, key, options);
    return JSON.parse(CryptoJS.enc.Utf8.stringify(dec));
}
