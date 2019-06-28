const axios = require('axios');

const functions = {
  fetchItems: () => axios.get('https://localhost:3002/similaritems/100')
    .then(res => res.data)
    .catch(err => 'error')
}

module.exports = functions;
