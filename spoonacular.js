const axios = require('axios');
const api_regex = /"apiKey":"(.*?)"/i;

const creds = {
  email: 'khantu@abv.bg',
  password: '123456789',
};

const get_key = () => {
  return axios
    .get('https://spoonacular.com/food-api/console#Dashboard', {
      withCredentials: true,
    })
    .then((response) => {
      const cookie = response.headers['set-cookie'];
      return cred(cookie, (logged_cookie) => {
        return get_api_key(logged_cookie, (key) => key);
      });
    });
};

const delete_acc = () => {
  get_key().then((key) => {
    return axios.get(
      `https://api.spoonacular.com/spoonacular-api/deleteAccount?apiKey=${key}`
    );
  });
};

const cred = (cookie, success) => {
  return axios
    .get(
      `https://spoonacular.com/api/logIn?email=${creds.email}&password=${creds.password}`,
      {headers: {Cookie: cookie.toString()}}
    )
    .then((res) => {
      if (res.data.status === 'failure') {
        return register(cookie).then((res) => cred(cookie, success));
      }
      return success(res.headers['set-cookie']);
    });
};

const register = (cookie) => {
  return axios.get(
    `https://spoonacular.com/api/register?email=${creds.email}&password=${creds.password}`,
    {headers: {Cookie: cookie.toString()}}
  );
};

const get_api_key = (logged_cookie, success) => {
  return axios
    .get('https://spoonacular.com/food-api/console', {
      headers: {Cookie: logged_cookie.toString()},
    })
    .then((res) => {
      const api_key = res.data.match(api_regex)[1];
      return success(api_key);
    });
};

exports.get_key = get_key;
exports.delete_acc = delete_acc;
exports.creds = creds;
