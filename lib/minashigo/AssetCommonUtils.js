'use strict';
// const CryptoJS = require('./crypto-js.js');
const RESOURCE_QUALITY_KEY = 'resourceQuality';
const QUALITY_KEY = 'quality-';
const SCALE_KEY = 'scale-';
const FRAME_LATE_KEY = 'frameLate';

const PathConvertFunc1 = md5str => [md5str.substring(0, 2), md5str.substring(4, 6)];
const PathConvertFunc2 = md5str => [md5str.substring(2, 4), md5str.substring(6, 8), md5str.substring(0, 2)];
const PathConvertFunc3 = md5str => [
    md5str.substring(4, 6),
    md5str.substring(0, 2),
    md5str.substring(6, 8),
    md5str.substring(2, 4)
];
const PathConvertFunc4 = md5str => [
    md5str.substring(6, 8),
    md5str.substring(2, 4),
    md5str.substring(4, 6),
    md5str.substring(0, 2)
];
const PathConvertFunctions = {
    0: PathConvertFunc1,
    1: PathConvertFunc1,
    2: PathConvertFunc1,
    3: PathConvertFunc1,
    4: PathConvertFunc2,
    5: PathConvertFunc2,
    6: PathConvertFunc2,
    7: PathConvertFunc2,
    8: PathConvertFunc3,
    9: PathConvertFunc3,
    a: PathConvertFunc3,
    b: PathConvertFunc3,
    c: PathConvertFunc4,
    d: PathConvertFunc4,
    e: PathConvertFunc4,
    f: PathConvertFunc4
};


function _makeMD5Path(md5str) {
    if (md5str[0] === '.') {
        return '';
    }
    const first = md5str[0];
    /** @type {string[]} */
    const dirs = PathConvertFunctions[first](md5str);
    return dirs.join('/');
}

function convertMD5Path(assetData) {
    const md5str = CryptoJS.MD5(assetData.path).toString(CryptoJS.enc.Hex);
    const dir = assetData.path.substr(0, assetData.path.lastIndexOf('.'));
    const md5path = CryptoJS.MD5(dir).toString(CryptoJS.enc.Hex);
    const convertPath = _makeMD5Path(md5path);
    const ext ='.'+ assetData.path.split('.').pop();
    return [md5str, convertPath, assetData.md5 + ext].join("/");
}
// assetPath = "fa9b25d2d37477c3d2829c8956997c8b/15/a5/11/d3/3829cb1a5743615fa3d78b44ebf8682f.png"

// var args = process.argv.splice(2);
// const assetData = {
//     "path": args[0],
//     "quality": 0,
//     "md5": args[1]
// }
// const assetPath = convertMD5Path(assetData);
// console.log(assetPath)
