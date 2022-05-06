const { Router } = require('express');

const Sequelize = require('sequelize');

const axios = require('axios');

const { Country } = require('../db.js');
//Importo el modelo a utilizar

//-----------CODIGO-----------

const router = Router();

//Configuro las rutas
//Like router.use('/countries', Countries);

//Data de API

countriesApi = async () => {
    const countriesUrl = await axios.get('https://restcountries.com/v3/all');
    const countries = await countriesUrl.data.map(country => {
        return {
            name: country.name.common,
            id: country.cca3,
            flags: country.flags[0],
            continent: country.continents[0],
            capital: country.capital != null? country.capital : 'No se encontro capital',
            subregion: country.subregion,
            area: country.area,
            population: country.population
        }
    });
    return countries;
}

//Rutas

router.get('/countries', async (req, res) => {
    // Traer todos los paises de la API a la DB
    // Almacenar solo los datos necesarios para las rutas principales
    // Obtener listado de los paises

    const countries = await countriesApi();
    //API data

    const queryName = req.query.name;
    //Query data

    const queryOrder = req.query.order;

    try {// DB llena?
        let fullDB = await Country.findAll({
            include: {
                model: Activity,
            }
        });
        
        if (!fullDB.length){
            
            await Country.bulkCreate(countries);
            //Esta funcion levanta los campos necesarios desde el objeto Country y lo pasa a la tabla.
            //Para los campos vacios directamente no los guarda.
        };
    } catch (error){
        console.log(error);
    };

    if (queryName){
        let countryName = await Country.findAll({
            where: {
                name: {
                    [Sequelize.Op.iLike] : `%${queryName}%`
                }
            }
        });
        countryName.length ?
        res.status(200).send(countryName) : res.status(404).send('No se encontro el pais ingresado');
    } else {
        let fullDB = await Country.findAll({
            include: {
                model: Activity
            }
        });
        res.status(200).send(fullDB);
    }
});

router.get('/countries/:id', async (req, res) => {

    const countryId = req.params.id;

    let countryById = await Country.findByPk(countryId, {
        include: {
            model : Activity
        }
    });
    res.status(200).send(countryById);
});

module.exports = router;

