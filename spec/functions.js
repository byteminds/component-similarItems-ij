const axios = require('axios');

const functions = {
  fetchItems: () => axios.get('http://localhost:3002/similaritems/46')
    .then(res => res.data)
    .catch(err => {
      console.log('ERROR!', err);
    })
}

module.exports = functions;
