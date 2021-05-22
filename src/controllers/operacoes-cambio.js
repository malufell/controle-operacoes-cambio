const database = require("../models");
const sequelize = require("sequelize");
const CriaQueryBuscaService = require("../services/CriaQueryBusca");
const FormataNumeroEmMoedaService = require("../services/FormataNumeroEmMoeda");
const FormataDataService = require("../services/FormataData");
const BuscaOpcoesMoedaOrigemService = require("../services/BuscaOpcoesMoedaOrigem");
const taxasMoedaOrigem = new BuscaOpcoesMoedaOrigemService();

class Operacoes {

  static async exibeFormulario(req, res) {

    try {
      const opcoesMoedaOrigem = await taxasMoedaOrigem.call();
      return res.render("cadastro", {
        operacao: {},
        opcoesMoedaOrigem: opcoesMoedaOrigem,
        error: false,
      });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaRegistro(req, res) {
    const novaOperacao = req.body;

    try {
      await database.Operacoes.create(novaOperacao);
      return res.redirect("/");

    } catch (error) {
      const errors = error.message.split(",");
      const mensagens = errors.map(function (erro) {
        return erro.replace(/Validation error: /i, "");
      });

      const opcoesMoedaOrigem = await taxasMoedaOrigem.call();

      return res.render("cadastro", {
        opcoesMoedaOrigem: opcoesMoedaOrigem,
        operacao: req.body,
        error: mensagens,
      });
    }
  }

  static async editaRegistro(req, res) {
    const idOperacao = req.params;

    try {
      const opcoesMoedaOrigem = await taxasMoedaOrigem.call();
      const operacao = await database.Operacoes.findOne({ where: idOperacao, include: database.Taxas });
      operacao.valorConvertido = new FormataNumeroEmMoedaService(operacao.valorConvertido).call();
      operacao.taxaCobrada = new FormataNumeroEmMoedaService(operacao.taxaCobrada).call();
      return res.render("cadastro", {
        operacao: operacao,
        opcoesMoedaOrigem: opcoesMoedaOrigem,
        error: false,
      });

    } catch (error) {
      return res.status(500).json(error.message);
    };
  };

  static async atualizaRegistro(req, res) {
    const { id } = req.params;
    const novaInformacao = req.body;

    try {
      await database.Operacoes.update(novaInformacao, { where: { id: Number(id) }});
      return res.redirect("/");

    } catch (error) {
      return res.status(500).json(error.message);
    };
  };

  static async buscaRegistros(req, res) {
    const busca = req.query.q ? req.query.q : "";
    const { dataInicio, dataTermino } = req.query;
    const whereCondicoes = new CriaQueryBuscaService(busca, dataInicio, dataTermino).call();

    try {
      let operacoes = await database.Operacoes.findAll({ where: whereCondicoes, include: database.Taxas });
      operacoes = operacoes.map(function (operacao) {
        operacao.valorOriginal = new FormataNumeroEmMoedaService(operacao.valorOriginal).call();
        operacao.valorConvertido = new FormataNumeroEmMoedaService(operacao.valorConvertido).call();
        operacao.taxaCobrada = new FormataNumeroEmMoedaService(operacao.taxaCobrada).call();
        operacao.dataOperacao = new FormataDataService(operacao.dataOperacao).call();
        return operacao;
      });

      const operacaoNaoEncontrada = (busca || dataInicio || dataTermino) && operacoes.length == 0;

      let totais = await database.Operacoes.findAll({
        attributes: [
          [sequelize.fn("sum", sequelize.col("valorOriginal")), "totalValorOriginal"], 
          [sequelize.fn("sum", sequelize.col("valorConvertido")), "totalValorConvertido"], 
          [sequelize.fn("sum", sequelize.col("taxaCobrada")), "totalTaxaCobrada"], 
        ],
        where: whereCondicoes,
      });

      totais = totais.map(function (total) {
        total.dataValues.totalValorOriginal = new FormataNumeroEmMoedaService(total.dataValues.totalValorOriginal).call();
        total.dataValues.totalValorConvertido = new FormataNumeroEmMoedaService(total.dataValues.totalValorConvertido).call();
        total.dataValues.totalTaxaCobrada = new FormataNumeroEmMoedaService(total.dataValues.totalTaxaCobrada).call();
        return total;
      });

      return res.render("index", {
        operacoes: operacoes,
        totais: totais,
        cliente: busca,
        dataInicio: dataInicio,
        dataTermino: dataTermino,
        operacaoNaoEncontrada: operacaoNaoEncontrada,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaRegistro(req, res) {
    const { id } = req.params;
    try {
      await database.Operacoes.destroy({
        where: { id: Number(id) },
      });
      return res.redirect("/");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Operacoes;
