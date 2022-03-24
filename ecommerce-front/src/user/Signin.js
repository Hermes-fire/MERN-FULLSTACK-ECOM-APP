import React,{useState} from "react";
import Layout from "../core/Layout";
import {signin, authenticate, isAuthenticated} from '../auth'
import { Redirect } from "react-router-dom";


const Signin = () => {
    const [values,setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, loading, error, redirectToReferrer} = values
    const {user} = isAuthenticated()

    const handleChange = val => event => {
        setValues({...values, error: false, [val]: event.target.value})
    }

    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true});
        signin({ email, password }).then(data => {
            if (data.hasOwnProperty('errors')) {
                setValues({ ...values, error: data.errors[0].msg, loading: false });
                return ''
            }else if(data.hasOwnProperty('error')){
                setValues({ ...values, error: data.error, loading: false });
                return ''
            }else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        loading: false,
                        redirectToReferrer: true
                    });
                })
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showLoading = () => (
        loading && (<div className='aler alert-info'>
            <h2>Loading...</h2>
        </div>)
    )

    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard'/>
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
    }
    const signUpForm = () => (
        <form>
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
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin