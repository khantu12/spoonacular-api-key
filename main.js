// import * as dereg from './deregister';
const dereg = require('./deregister');

dereg.creds = {
    email: "khantu@abv.bg",
    password: "123456789"
}
dereg.get_key().then((key) => console.log(key));
// dereg.delete_acc();