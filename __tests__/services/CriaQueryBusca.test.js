const { test, expect } = require('@jest/globals');
const CriaQueryBuscaService = require('../../src/services/CriaQueryBusca');

describe('quando informado o cliente', () => {
  const subject = new CriaQueryBuscaService('test', null, null).call();

  test('retorna o cliente', () => {
    expect(subject.cliente).toBeDefined();
  });
});

describe('quando informado as data de início e de término', () => {
  const subject = new CriaQueryBuscaService(null, '01/01/2021', '01/01/2021').call();

  test('não retorna o cliente', () => {
    expect(subject.cliente).toBeUndefined();
  });

  test('retorna a data de operacao', () => {
    expect(subject.dataOperacao).toBeDefined();
  });
});

describe('quando informado somente a data de início', () => {
  const subject = new CriaQueryBuscaService(null, '01/01/2021', null).call();

  test('não retorna o cliente', () => {
    expect(subject.cliente).toBeUndefined();
  });

  test('retorna a data de operacao', () => {
    expect(subject.dataOperacao).toBeDefined();
  });
});

describe('quando informado somente a data de término', () => {
  const subject = new CriaQueryBuscaService(null, null, '01/01/2021').call();
  test('não retorna o cliente', () => {
    expect(subject.cliente).toBeUndefined();
  });
  test('retorna a data de operacao', () => {
    expect(subject.dataOperacao).toBeDefined();
  });
});