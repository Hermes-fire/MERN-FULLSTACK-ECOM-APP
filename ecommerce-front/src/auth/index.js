import {API} from '../config'

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const authenticate = (data, next) => {
    if(typeof window.localStorage !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if(typeof window.localStorage !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(res => {
            console.log('signout')
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const isAuthenticated = () => {
    if(typeof window.localStorage == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
}