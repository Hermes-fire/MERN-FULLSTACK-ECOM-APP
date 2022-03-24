import React,{useState}from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import {createCategory} from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //destruct user token from localStorage

    const {user, token} = isAuthenticated()
    console.log(token)

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        //make request to api to create category
        createCategory(user._id, token, {name})
        .then(data =>{
            if(data.error) {
                setError(data.error)
            }else{
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryFrom = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className='btn btn-outline-primary'>Create Category</button>
        </form>
    )
    const showSucess= () => (
        success && (<h3 className='text-success'>Category {name} created successfully</h3>)
    )
    const showError= () => (
        error && (<h3 className='text-danger'>Category already exists</h3>)
    )

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    )

    return (
        <Layout title='Add a new category' description={`Hello ${name}, ready to add new category ?`} className = 'container-fluid'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-2">
                {showSucess()}
                {showError()}
                {newCategoryFrom()}
                {goBack(``)}
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default AddCategory