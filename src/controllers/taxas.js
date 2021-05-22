const database = require("../models");
const BuscaOpcoesMoedaDestinoService = require("../services/BuscaOpcoesMoedaDestino");
const MoedasApiRequestService = require("../services/MoedasApiRequestService");
const CalculaConversaoService = require("../services/CalculaConversao");

class Taxas {

  static async exibeFormulario(req, res) {
    try {
      const listaMoedas =  new MoedasApiRequestService();
      const opcoes = await listaMoedas.call();

      return res.render("taxas-cadastro", {
        opcoes: opcoes,
        taxa: {},
        error: false,
      });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  
  static async criaRegistro(req, res) {  
    const novoValorConversao = req.body;
    try {
      await database.Taxas.create(novoValorConversao);
      return res.redirect('/taxas');

    } catch (error) {
      const errors = error.message.split(',');
      const mensagens = errors.map(function (erro) { return erro.replace(/Validation error: /i, "") });
      const listaMoedas =  new MoedasApiRequestService();
      const opcoes = await listaMoedas.call();
      return res.render('taxas-cadastro', { error: mensagens, taxa: req.body, opcoes: opcoes});
    };
  };

  static async editaRegistro(req, res) {
    const idTaxa = req.params; 
      const listaMoedas =  new MoedasApiRequestService();
      const opcoes = await listaMoedas.call();
    try {
        const taxa = await database.Taxas.findOne({ where: idTaxa });
        return res.render("taxas-cadastro", { 
          opcoes: opcoes, 
          taxa: taxa, 
          error: false 
        });

      } catch (error) {
        const errors = error.message.split(',');
        const mensagens = errors.map(function (erro) { return erro.replace(/Validation error: /i, "") });
        const listaMoedas =  new MoedasApiRequestService();
        const opcoes = await listaMoedas.call();
        return res.render('taxas-cadastro', { error: mensagens, taxa: req.body, opcoes: opcoes});
    };
  };

  static async atualizaRegistro(req, res) {
    const { id } = req.params;
    const novaInformacao = req.body;

    try {
        await database.Taxas.update(novaInformacao, { 
            where: { id: Number(id) } 
        });
      return res.redirect('/taxas');
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static async calculaConversao(req, res) {
    const { moedaOrigem, moedaDestino, valorOriginal } = req.query;

    try {
      const conversao = new CalculaConversaoService(moedaOrigem, moedaDestino, valorOriginal);
      return res.status(200).json(await conversao.call());
    } catch (error) {
      return res.status(500).json(error.message); 
    };
  };

  static async buscaRegistros(req, res) {
      try {
        const taxas = await database.Taxas.findAll({ order: [["descricaoMoedaOrigem", "ASC"]] });

        return res.render("taxas-lista", {
          taxas: taxas,
        });
      } catch (error) {
        return res.status(500).json(error.message);
      }
  };

  static async buscaMoedaDestino(req, res) {
    const moedaOrigem = req.query;

    try {
        const opcoesMoedaDestino = new BuscaOpcoesMoedaDestinoService();
        const lista = await opcoesMoedaDestino.call(moedaOrigem);
        return res.status(200).json(lista); 

    } catch (error) {
      return res.status(500).json(error.message); 
    };
  };

  static async deletaRegistro(req, res) {
    const { id } = req.params;
    try {
      await database.Taxas.destroy({ 
        where: { id: Number(id) }
      });
      return res.redirect('/taxas');
    } catch (error) {
        return res.status(500).json(error.message);
    };
  };
};
module.exports = Taxas;