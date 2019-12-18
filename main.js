// import * as dereg from './deregister';
const dereg = require('./deregister');

dereg.get_key().then((key) => console.log(key));
// dereg.delete_acc();