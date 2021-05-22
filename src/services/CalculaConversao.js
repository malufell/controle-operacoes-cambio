const database = require("../models");

class CalculaConversaoService {
  constructor(moedaOrigem, moedaDestino, valorOriginal) {
    this.moedaOrigem = moedaOrigem;
    this.moedaDestino = moedaDestino;
    this.valorOriginal = valorOriginal;
    this.taxaCobrada = 0.10;

  }

  async call() {
    const taxa = await database.Taxas.findOne({
      where: {
        moedaOrigem: this.moedaOrigem,
        moedaDestino: this.moedaDestino,
      },
    });

    const valorConvertido = taxa.taxa * this.valorOriginal;
    const valorTaxaCobrada = this.valorOriginal * this.taxaCobrada;

    return {
      taxaId: taxa.id,
      taxa: taxa.taxa,
      valorConvertido: valorConvertido,
      valorTaxaCobrada: valorTaxaCobrada,
    };
  }
}

module.exports = CalculaConversaoService;
