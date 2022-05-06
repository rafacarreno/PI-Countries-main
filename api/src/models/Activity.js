const { DataTypes } = require('sequelize');
//Exportamos la funcion que define el modelo.
//Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    //el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5')
        },
        duration: {
            type: DataTypes.STRING
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    });
};