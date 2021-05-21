const { test, expect } = require('@jest/globals');

const FormataNumeroEmMoedaService = require('../../src/services/FormataNumeroEmMoeda');

test('ao informar o valor 1 retorna 1,00', () => {
    expect(new FormataNumeroEmMoedaService(1).call()).toBe("1,00")
});

test('ao informar o valor 1.50 retorna 1,50', () => {
    expect(new FormataNumeroEmMoedaService(1.50).call()).toBe("1,50")
});