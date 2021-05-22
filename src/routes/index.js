const express = require('express');
const router = express.Router();
const Operacoes = require('../controllers/operacoes-cambio');
const Taxas = require('../controllers/taxas');


router.get('/', Operacoes.buscaRegistros);
router.get('/cadastro', Operacoes.exibeFormulario);
router.post('/cadastro', Operacoes.criaRegistro);
router.get('/operacao/:id', Operacoes.editaRegistro);
router.put('/operacao/:id/', Operacoes.atualizaRegistro);
router.delete('/operacao/:id', Operacoes.deletaRegistro);

router.get('/conversao', Taxas.calculaConversao);

router.get('/taxas', Taxas.buscaRegistros);
router.get('/taxas/cadastro', Taxas.exibeFormulario);
router.post('/taxas/cadastro', Taxas.criaRegistro);
router.get('/taxas/:id', Taxas.editaRegistro);
router.put('/taxas/:id', Taxas.atualizaRegistro);
router.delete('/taxas/:id', Taxas.deletaRegistro);
router.get('/moedaDestino/', Taxas.buscaMoedaDestino);

module.exports = router;