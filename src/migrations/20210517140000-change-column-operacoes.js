module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Operacoes', 'dataOperacao', {
                type: Sequelize.STRING,
            }),
        ])
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Operacoes', 'dataOperacao', {
                type: Sequelize.DATEONLY,
            }),
        ])
    }
};