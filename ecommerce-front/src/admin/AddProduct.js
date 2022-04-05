import React,{useState, useEffect}from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import {createProduct} from './apiAdmin'
import { getCategories } from './apiAdmin';

const AddProduct = () => {
    const {user, token} = isAuthenticated()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        category,
        categories,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values


    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({
            ...values, [name]: value 
        })
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, error: '', loading: true})

        createProduct(user._id, token, formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error})
                }else{
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name,
                    })
                }
            })
    }
    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(()=>{
        init()
    },[])

    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn- btn-secondary p-2 rounded'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*'/>
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' onChange={handleChange('name')} value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea className='form-control' onChange={handleChange('description')} value={description}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input type='number' className='form-control' onChange={handleChange('price')} value={price}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select className='form-control' onChange={handleChange('category')}>
                     <option>Please select</option>
                     {categories && categories.map((c,i) => (
                         <option key={i} value={c._id}>{c.name}</option>
                     ))}
                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input type='number' className='form-control' onChange={handleChange('quantity')} value={values.quantity}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select className='form-control' onChange={handleChange('shipping')}>
                <option>Please select</option>
                     <option value='0'>No</option>
                     <option value='1'>Yes</option>
                </select>
            </div>
            <button className = 'btn btn-outline-primary'>Create Product</button>
        </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {JSON.stringify(error)}
        </div>
    )

    const showSucess = () => (
        <div className='alert alert-info' style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )

    return (
        <Layout title='Add a new product' description={`Hello ${user.name}, ready to add new product ?`} className = 'container-fluid'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-2">
                    {showSucess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default AddProduct