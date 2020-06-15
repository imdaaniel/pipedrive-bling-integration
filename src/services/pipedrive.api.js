const axios = require('axios');

const pipedrive = {
  base_url: 'https://api.pipedrive.com/v1',
  api_token: '0b93def077b38a1e18b85c6a8d751a89d4a4068c',

  list: async () => {
    const response = await axios.get(`${pipedrive.base_url}/deals`, {
      params: {
        api_token: pipedrive.api_token,
        status: 'won'
      }
    });

    const opportunities = response.data;

    return opportunities.data;
  },
  
  removeDuplicates: (opportunities, orderIds) => {
    const newOpportunities = opportunities.filter(opportunity => !orderIds.hasOwnProperty(opportunity.id));

    return newOpportunities;
  }
}

module.exports = pipedrive;