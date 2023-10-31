// import * as dereg from './deregister';
const spoonacular = require('./spoonacular');

spoonacular.creds = {
  email: 'some@email.com',
  password: '123456789',
};
spoonacular.get_key().then((key) => console.log(key));
// spoonacular.delete_acc();
