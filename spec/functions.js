const axios = require('axios');
const getType = require('jest-get-type');

const functions = {
  fetchItems: () => axios.get('http://localhost:3002/similaritems/46')
    .then(res => res.data)
    .catch(err => {
      console.log(' >>>>>>>>>>> ERROR! ', err);
    }),

  dataType: () => axios.get('http://localhost:3002/similaritems/46')
    .then(res => {
      let result = res.data;
      result = getType(result);
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(' dataType function error: ', err);
    }),

  itemsType: () => axios.get('http://localhost:3002/similaritems/46')
    .then(res => {
      let result = res.data.items;
      result = getType(result);
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(' dataType function error: ', err);
    }),


}

module.exports = functions;
