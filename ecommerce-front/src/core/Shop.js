import React, {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFiltredProducts } from './ApiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import {prices} from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: []}
    })
    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [filtredResults,setfiltredResults] = useState([])
    

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = (newFilters) => {
        getFiltredProducts(skip, limit, myFilters.filters).then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setfiltredResults(data.data)
            }
        })
    }

    useEffect(()=>{
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    },[])

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(newFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data) {
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array
    }

    return (
        <Layout title = "Shop Page" description='Search and find books of your choice' className='m-5'>
        <div className='row'>
            <div className='col-4'>
                <h4>filter by categories</h4>
                <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                <h4>filter by price range</h4>
                <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}/>
            </div>
            <div className='col-8'>
                <h2 className='mb-4'>Products</h2>
                <div className='row'>
                    {filtredResults.map((p,i)=>(
                            <Card key={i} product={p}/>
                    ))}
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Shop