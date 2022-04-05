import {API} from '../config'


export const getProduct = (sortBy) => {
    return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCategories = () => {
    return fetch(`${API}/category`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getFiltredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`${API}/product/by/search/`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then( res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}