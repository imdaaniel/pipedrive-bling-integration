const axios = require('axios');
const xml = require('xml');
const FormData = require('form-data');
const { response } = require('express');

const bling = {
  base_url: 'https://bling.com.br/Api/v2',
  apikey: 'b0ccab4ed68422d3d487bded1160b4cdebf340e044d13d9dbc21e22d3aa9a1c154e3558c',
  
  orders: async () => {
    const response = await axios.get(`${bling.base_url}/pedidos/json`, {
      params: {
        apikey: bling.apikey
      }
    });

    let orders = response.data;

    orders = orders.retorno.pedidos.map(order => order.pedido);

    return orders;
  },

  ids: orders => {
    const ids = {};

    orders.forEach(order => {
      ids[order.numeroOrdemCompra] = true;
    });

    return ids;
  },

  prepare: async opportunities => {
    var xmls = [];
    var xmlString;

    opportunities.forEach(opportunity => {
      xmlString = xml({
        pedido: [
          {
            numeroOrdemCompra: opportunity.id,
          },
          {
            cliente: [
              {
                nome: opportunity.org_id.name
              }
            ]
          },
          {
            items: [
              {
                item: [
                  {
                    codigo: 1
                  }
                ]
              }
            ]
          }
        ],
      }, {
        declaration: true,
      });

      xmls.push(xmlString);
    });

    return xmls;
  },

  createOrders: async newOpportunities => {
    const xmlStrings = await bling.prepare(newOpportunities);
    let amount = 0;
    
    for (let i = 0; i < newOpportunities.length; i++) {
      const form = new FormData();
      form.append('apikey', bling.apikey);
      form.append('xml', xmlStrings[i]);

      let response = await axios.post(`${bling.base_url}/pedido/json`, form, {
        headers: form.getHeaders()
      });

      amount += newOpportunities[i].value;
    }

    return amount;
  }
}

module.exports = bling;