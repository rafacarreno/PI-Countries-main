const { Router } = require('express');

const Sequelize = require('sequelize');

const axios = require('axios');

const { Country, Activity } = require('../db.js');

const router = Router();

router.get('/activity', async (req, res) => {
    try{
        let activites = await Activity.findAll();
        res.status(200).send(activities);
        } catch (error) {
            console.log(error);
        };
});

router.post('/activity', async (req, res) =>{
    try{
        //1° Crear nueva actividad.
        let { name, difficulty, duration, season, countries} = req.body;
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });

        //2° Revisar el arreglo de paises ("countries") para saber cual crear.

        countries.forEach( async (country) => {
            let activityCountry = await Country.findOne({
                where: {
                    name : country
                }
            });
            await newActivity.addCountry(activityCountry);
        });
        res.status(200).send('La actividad se creo exitosamente.');
    } catch (error) {
        console.log(error);
        res.status(500).send('No se pudo crear la actividad.');
    }
});

module.exports = router;