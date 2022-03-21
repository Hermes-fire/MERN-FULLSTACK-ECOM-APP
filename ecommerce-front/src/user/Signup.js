import React,{useState} from "react";
import Layout from "../core/Layout";
import {signup} from '../auth'
import { Link } from "react-router-dom";


const Signup = () => {
    const [values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, success, error} = values

    const handleChange = val => event => {
        setValues({...values, error: false, [val]: event.target.value})
    }

    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.hasOwnProperty('errors')) {
                setValues({ ...values, error: data.errors[0].msg, success: false });
                return ''
            }else if(data.hasOwnProperty('error')){
                setValues({ ...values, error: data.err, success: false });
                return ''
            }else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSucess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account created. Please <Link to='/signin'>Signin</Link>
        </div>
    )

    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' onChange={handleChange('name')} value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input type='email' className='form-control' onChange={handleChange('email')} value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input type='password' className='form-control' onChange={handleChange('password')} value={password}/>
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Sign Up</button>
        </form>
    )
    return (
        <Layout 
        title = "Signup Page" 
        description='Signup to Node React E-commerce App' 
        className='container col-md-8'>
            {showSucess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup