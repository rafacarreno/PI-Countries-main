import axios from 'axios'

//Conexion con Backend

export function getCountries(order){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/api/countries?order=' + order);
        const data = json.data;
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: data
        });
    };
};

export const getCountry = (id) => dispatch => {
    return fetch ('http://localhost:3001/api/countries/' + id)
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'GET_COUNTRY',
            payload: data    
        });
    });
};

export function getActivities (){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/api/activity');
        return dispatch({
            type: 'GET_ACTIVITY',
            payload: json.data
        });
    
    };
};