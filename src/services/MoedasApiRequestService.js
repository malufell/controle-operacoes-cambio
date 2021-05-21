const axios = require("axios");

class MoedasApiRequestService {
  constructor() {}

  async call() {

    try {
      const response = await axios.get("https://economia.awesomeapi.com.br/json/available/uniq");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MoedasApiRequestService;