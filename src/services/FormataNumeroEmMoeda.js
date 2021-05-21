class FormataNumeroEmMoedaService {
  constructor(valor) {
    this.valor = valor;
  };

  call() {
    return Number(this.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
};

module.exports = FormataNumeroEmMoedaService;