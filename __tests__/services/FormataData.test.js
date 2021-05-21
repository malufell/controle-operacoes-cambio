const { test, expect } = require('@jest/globals');
const FormataDataService = require('../../src/services/FormataData');

test('ao informar a data no formato aaaa-mm-dd retorna a data no formato dd/mm/aaaa', () => {
    expect(new FormataDataService('2021-05-21').call()).toBe('21/05/2021')
});
