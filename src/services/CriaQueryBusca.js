const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class CriaQueryBuscaService {
  constructor(cliente, dataInicio, dataTermino) {
    this.cliente = cliente;
    this.dataInicio = dataInicio;
    this.dataTermino = dataTermino;
    this.whereCondicoes = {};
  }

  call() {
    this.cliente && (this.whereCondicoes.cliente = { [Op.iLike]: "%" + this.cliente + "%" });

    this.dataInicio || this.dataTermino ? this.whereCondicoes.dataOperacao = {} : null;
    
    if (this.dataInicio && this.dataTermino) {
      this.whereCondicoes.dataOperacao[Op.gte] = this.dataInicio;
      this.whereCondicoes.dataOperacao[Op.lte] = this.dataTermino;

    } else if (this.dataInicio && !this.dataTermino) {
      this.whereCondicoes.dataOperacao[Op.eq] = this.dataInicio;
    
    } else if (this.dataTermino && !this.dataInicio) {
      this.whereCondicoes.dataOperacao[Op.eq] = this.dataTermino;
    };

    return this.whereCondicoes;
  };
};

module.exports = CriaQueryBuscaService;
