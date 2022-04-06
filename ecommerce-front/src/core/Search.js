import React, {useState, useEffect} from "react";
import {getCategories, list} from "./ApiCore"
import Card from "./Card";

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category:'',
        search:'',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = data
    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            }else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])

    const searchData = () => {
        console.log(search, category)
        if(search) {
            list({search: search || undefined, category: category})
            .then(res => {
                if(res.error){
                    console.log(res.error)
                }else{
                    setData({...data, results: res, searched: true})
                }
            })
        }
    }
    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = prop => event => {
        setData({...data,[prop]: event.target.value, searched: false})
    }

    const searchedProduct = (res = []) => {
        return (
            <div className="row">
                {res.map((p,i) => (
                    <Card key={i} product={p}/>
                ))}
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit} className='mb-3'>
            <span className="input-group-text">
                <div className="input-group input-group-lg" >
                    <div className="input-group-prepend">
                        <select className="btn mr-2"onChange={handleChange('category')}>
                            <option value="All">Pick Category</option>
                            {categories.map((c,i)=>(
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className='form-control' onChange={handleChange('search')} placeholder='Search by name' />
                    <div className="input-group-prepend" >
                        <button className="input-group-text">Search</button>
                    </div>
                </div>
            </span>
        </form>
    )

    return (
        <div >
            {searchForm()}
            {searchedProduct(results)} 
        </div>
    )
}

export default Search