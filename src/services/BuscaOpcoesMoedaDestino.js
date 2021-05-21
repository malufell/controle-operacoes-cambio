const database = require("../models");
const Sequelize = require("sequelize");

class BuscaOpcoesMoedaDestinoService {

  constructor() {
  }

  async call(where = {}) {
      const taxasMoedaDestino = await database.Taxas.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("moedaDestino")), "moedaDestino"],
          "descricaoMoedaDestino",
        ],
        order: [["descricaoMoedaDestino", "DESC"]],
        where: { ...where }
      });

    return taxasMoedaDestino;
  };
};

module.exports = BuscaOpcoesMoedaDestinoService;