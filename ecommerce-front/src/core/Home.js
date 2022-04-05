import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProduct} from "./ApiCore"
import Card from "./Card";
import Search from "./Search";



const Home = () => {

    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProduct('sold').then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setProductBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => { 
        getProduct('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setProductByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductsBySell()
        loadProductsByArrival()
    },[])

    return (
        <Layout title = "Home Page" description='Node React E-commerce App' className='m-5'>
            <Search/>
            <h2 className="mb-4">Best Sellers</h2>
            <div className='row'>
            {productBySell.map((product,i)=>(
                <Card key={i} product={product} />
            ))}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className = 'row'>
            {productByArrival.map((product,i)=>(
                <Card key={i} product={product} />
            ))}
            </div>
            

        </Layout>
    )
}

export default Home
