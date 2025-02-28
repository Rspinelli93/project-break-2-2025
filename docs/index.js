const productInfo = require('./productInfo');
const products = require('./products');
const components = require('./components');

module.exports = {
    ...productInfo,
    ...products,
    ...components
};