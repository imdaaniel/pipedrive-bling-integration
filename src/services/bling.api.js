const axios = require('axios');

const bling = {
  base_url: 'https://bling.com.br/Api/v2',
  apikey: 'b0ccab4ed68422d3d487bded1160b4cdebf340e044d13d9dbc21e22d3aa9a1c154e3558c',
  orders: async () => {
    const response = await axios.get(`${bling.base_url}/pedidos/json`, {
      params: {
        apikey: bling.apikey
      }
    });

    const orders = response.data;

    return orders;
  }
}

module.exports = bling;